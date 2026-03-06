// ═══════════════════════════════════════
//  AUTH MODULE — OTP + Session
// ═══════════════════════════════════════
'use strict';

const AUTH_KEY = 'dh_session';
const OTP_KEY = 'dh_otp_pending';
const OTP_TTL = 5 * 60 * 1000;
const MAX_RESEND = 3;

function isLoggedIn() {
    // Để tích hợp với Phễu Landing Page: Chỉ đăng nhập khi có Session
    return !!getSession(); 
}
function getSession() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; }
}
function getCurrentUser() {
    // Trả về thông tin user dựa trên session đang hoạt động
    const s = getSession(); 
    if (s) {
        return getAllUsers().find(u => u.user_id === s.user_id) || null;
    } 
    return null;
}
function saveSession(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({
        user_id: user.user_id, email: user.email, name: user.name,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000
    }));
}
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'index.html';
}

function requestOTP(name, phone, email, position) {
    if (!name || !email) return { ok: false, error: 'Vui lòng nhập đầy đủ thông tin.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Email không hợp lệ.' };
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    localStorage.setItem(OTP_KEY, JSON.stringify({
        otp, name, phone, email, position,
        expires: Date.now() + OTP_TTL, resendCount: 0
    }));
    console.log(`%c[Mock OTP] ${email} → ${otp}`, 'background:#4F8EF7;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;');
    return { ok: true, otp_hint: otp };
}
function verifyOTP(inputOtp) {
    const p = getPendingOTP();
    if (!p) return { ok: false, error: 'Phiên OTP không tồn tại.' };
    if (Date.now() > p.expires) { localStorage.removeItem(OTP_KEY); return { ok: false, error: 'OTP đã hết hạn, vui lòng yêu cầu lại.' }; }
    if (p.otp !== inputOtp.trim()) return { ok: false, error: 'OTP không đúng.' };
    const user = upsertUser({ name: p.name, phone: p.phone, email: p.email, position: p.position });
    localStorage.removeItem(OTP_KEY);
    saveSession(user);
    return { ok: true, user };
}
function resendOTP() {
    const p = getPendingOTP();
    if (!p) return { ok: false, error: 'Không tìm thấy phiên OTP.' };
    if (p.resendCount >= MAX_RESEND) return { ok: false, error: 'Vượt quá số lần gửi lại.' };
    const newOtp = String(Math.floor(100000 + Math.random() * 900000));
    p.otp = newOtp; p.expires = Date.now() + OTP_TTL; p.resendCount++;
    localStorage.setItem(OTP_KEY, JSON.stringify(p));
    console.log(`%c[Mock OTP Resend] ${p.email} → ${newOtp}`, 'background:#7C3AED;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;');
    return { ok: true, otp_hint: newOtp };
}
function getPendingOTP() {
    try { return JSON.parse(localStorage.getItem(OTP_KEY)); } catch { return null; }
}

function upsertUser({ name, phone, email, position }) {
    const users = getAllUsers();
    let user = users.find(u => u.email === email);
    if (user) {
        user.name = name || user.name; user.phone = phone || user.phone;
        user.position = position || user.position; user.last_active = new Date().toISOString();
    } else {
        user = {
            user_id: 'u-' + Date.now(), customer_id: 'cust-' + Math.floor(Math.random() * 9000000 + 1000000),
            name, phone, email, position: position || '', industry: '', consent_email: true,
            lead_score: 0, lead_stage: 'Cold', tags: [],
            created_at: new Date().toISOString(), last_active: new Date().toISOString()
        };
        users.push(user);
    }
    saveUsers(users); return user;
}
function updateUserProfile(userId, updates) {
    const users = getAllUsers(); const idx = users.findIndex(u => u.user_id === userId);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates, last_active: new Date().toISOString() };
    saveUsers(users); return users[idx];
}

// Xử lý Form Thu Thập Lead trực tiếp (Không cần OTP cho phễu Landing Page)
function captureLead(name, phone, position, email) {
    if (!name || !email) return { ok: false, error: 'Thiếu thông tin bắt buộc' };
    
    // Gọi hàm Upsert: Sẽ tạo mới nếu Email chưa có, nếu Email đã có thì Update (không cần Pass)
    const user = upsertUser({ name, phone, email, position });
    
    // Đăng nhập tự động ngay tại thiết bị lấy Form
    saveSession(user);
    
    console.log(`%c[Lead Captured] Ghi nhận ${name} (${email})`, 'background:#10b981;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;');
    return { ok: true, user };
}
function updateHeaderUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    if (!loginBtn) return;
    if (isLoggedIn()) {
        const u = getCurrentUser();
        loginBtn.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            const nm = document.getElementById('userName'); if (nm) nm.textContent = u?.name?.split(' ').pop() || 'User';
            const av = document.getElementById('userAvatar'); if (av) av.textContent = (u?.name || 'U').charAt(0).toUpperCase();
        }
    } else {
        loginBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
}
