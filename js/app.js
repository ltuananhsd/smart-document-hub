// ═══════════════════════════════════════
//  APP.JS — Core App Logic + UI Helpers
// ═══════════════════════════════════════
'use strict';

// ─── Toast Notifications ─────────────────────────────────────────────────────
function showToast(type, title, msg, duration = 3500) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer'; container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <div><div class="toast-title">${title}</div>${msg ? `<div class="toast-msg">${msg}</div>` : ''}
  </div>`;
    container.appendChild(el);
    setTimeout(() => { el.style.animation = 'slideOut 0.3s ease forwards'; setTimeout(() => el.remove(), 300); }, duration);
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function openModal(id) {
    const m = document.getElementById(id); if (!m) return;
    m.classList.add('active'); document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    const m = document.getElementById(id); if (!m) return;
    m.classList.remove('active'); document.body.style.overflow = '';
}

// ─── Document Card Renderer ───────────────────────────────────────────────────
function renderDocCard(doc, linkBase = 'document.html') {
    const icon = FILE_ICONS[doc.file_type] || '📄';
    const gradients = {
        'PDF': 'rgba(239,68,68,0.12), rgba(124,58,237,0.08)',
        'DOCX': 'rgba(79,142,247,0.12), rgba(16,185,129,0.08)',
        'XLSX': 'rgba(16,185,129,0.12), rgba(79,142,247,0.08)',
        'PPT': 'rgba(245,158,11,0.12), rgba(239,68,68,0.08)'
    };
    const grad = gradients[doc.file_type] || gradients['PDF'];
    return `
  <div class="doc-card animate-in" onclick="location.href='${linkBase}?id=${doc.doc_id}'">
    <div class="doc-card-thumb" style="background:linear-gradient(135deg,${grad})">
      <span style="font-size:2.5rem">${icon}</span>
      <span class="badge badge-muted" style="position:absolute;top:10px;left:10px;font-size:0.65rem">${doc.file_type}</span>
      <span class="badge ${AccessClass[doc.access_mode] || 'badge-muted'}" style="position:absolute;top:10px;right:10px;font-size:0.65rem">${AccessLabel[doc.access_mode] || doc.access_mode}</span>
    </div>
    <div class="doc-card-body">
      <div class="doc-card-title">${doc.title}</div>
      <div class="doc-card-meta">
        <span class="badge badge-primary">${doc.category}</span>
        <span class="badge badge-accent">${doc.level}</span>
      </div>
      <p class="text-sm text-muted" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-top:4px">${doc.description}</p>
    </div>
    <div class="doc-card-footer">
      <div class="doc-stats flex-1">
        <span>👁 ${formatNum(doc.view_count)}</span>
        <span>⬇️ ${formatNum(doc.download_count)}</span>
      </div>
      <span class="badge badge-muted text-xs">${doc.topic}</span>
    </div>
  </div>`;
}

// ─── OTP Modal Builder ────────────────────────────────────────────────────────
function buildLoginModal() {
    return `
  <div id="loginModal" class="modal-overlay">
    <div class="modal">
      <button class="modal-close" onclick="closeModal('loginModal')">✕</button>
      <div id="loginStep1">
        <div class="logo-icon" style="width:48px;height:48px;font-size:1.3rem;margin-bottom:16px">📚</div>
        <div class="modal-title">Đăng nhập / Đăng ký</div>
        <div class="modal-sub">Nhập thông tin để nhận mã OTP xác thực qua email</div>
        <form id="loginForm" onsubmit="handleRequestOTP(event)" style="display:flex;flex-direction:column;gap:14px">
          <div class="form-group">
            <label class="form-label">Họ và tên *</label>
            <input id="f_name" class="form-input" placeholder="Nguyễn Văn A" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Email *</label>
              <input id="f_email" class="form-input" type="email" placeholder="you@company.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">Số điện thoại</label>
              <input id="f_phone" class="form-input" placeholder="09xx xxx xxx">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Chức vụ</label>
            <input id="f_position" class="form-input" placeholder="Marketing Manager">
          </div>
          <label style="display:flex;align-items:center;gap:10px;font-size:0.85rem;color:var(--text-secondary);cursor:pointer">
            <input type="checkbox" id="f_consent" checked style="accent-color:var(--color-primary)">
            Tôi đồng ý nhận tài liệu và email gợi ý phù hợp
          </label>
          <button type="submit" id="otpSendBtn" class="btn btn-primary w-full btn-lg">📨 Gửi mã OTP</button>
        </form>
      </div>
      <div id="loginStep2" class="hidden">
        <div class="modal-title">Nhập mã OTP</div>
        <div class="modal-sub" id="otpEmailHint">Mã 6 số đã gửi đến email của bạn.</div>
        <div class="otp-input-group" id="otpGroup">
          ${[0, 1, 2, 3, 4, 5].map(i => `<input class="otp-input" id="otp${i}" maxlength="1" inputmode="numeric" onkeyup="otpKeyup(event,${i})" oninput="this.classList.toggle('filled',this.value!='')"/>`).join('')}
        </div>
        <div id="otpError" class="hidden" style="color:var(--color-danger);font-size:0.85rem;text-align:center;margin-bottom:12px"></div>
        <button class="btn btn-primary w-full btn-lg" onclick="handleVerifyOTP()">✅ Xác nhận</button>
        <button class="btn btn-ghost w-full mt-md" onclick="handleResendOTP()">🔄 Gửi lại mã</button>
        <p class="text-center text-xs text-muted mt-md" style="cursor:pointer" onclick="goBackLogin()">← Quay lại</p>
      </div>
    </div>
  </div>`;
}

// ─── OTP UI Logic ─────────────────────────────────────────────────────────────
let _loginRedirect = null;
function openLoginModal(redirectUrl = null) {
    _loginRedirect = redirectUrl;
    if (!document.getElementById('loginModal')) document.body.insertAdjacentHTML('beforeend', buildLoginModal());
    openModal('loginModal');
}
function handleRequestOTP(e) {
    e.preventDefault();
    const btn = document.getElementById('otpSendBtn');
    btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Đang gửi...';
    const name = document.getElementById('f_name').value;
    const email = document.getElementById('f_email').value;
    const phone = document.getElementById('f_phone').value;
    const position = document.getElementById('f_position').value;
    const res = requestOTP(name, phone, email, position);
    if (!res.ok) { showToast('error', 'Lỗi', res.error); btn.disabled = false; btn.innerHTML = '📨 Gửi mã OTP'; return; }
    // Show OTP step
    document.getElementById('loginStep1').classList.add('hidden');
    document.getElementById('loginStep2').classList.remove('hidden');
    document.getElementById('otpEmailHint').textContent = `Mã 6 số đã gửi đến ${email}. (Demo: xem Console)`;
    document.getElementById('otp0').focus();
    // Auto-fill hint for demo
    if (res.otp_hint) {
        showToast('info', 'Demo Mode', `OTP: ${res.otp_hint} (xem Console F12)`, 8000);
    }
}
function otpKeyup(e, idx) {
    const inputs = document.querySelectorAll('.otp-input');
    if (e.target.value && idx < 5) inputs[idx + 1].focus();
    if (e.key === 'Backspace' && !e.target.value && idx > 0) inputs[idx - 1].focus();
    if (e.key === 'Enter') handleVerifyOTP();
}
function handleVerifyOTP() {
    const otp = [0, 1, 2, 3, 4, 5].map(i => document.getElementById('otp' + i).value).join('');
    const res = verifyOTP(otp);
    const errEl = document.getElementById('otpError');
    if (!res.ok) { errEl.textContent = res.error; errEl.classList.remove('hidden'); return; }
    errEl.classList.add('hidden');
    closeModal('loginModal');
    updateHeaderUI();
    showToast('success', 'Đăng nhập thành công!', `Chào mừng ${res.user.name} 👋`);
    if (_loginRedirect) { setTimeout(() => { window.location.href = _loginRedirect; }, 500); _loginRedirect = null; }
}
function handleResendOTP() {
    const res = resendOTP();
    if (!res.ok) { showToast('error', 'Lỗi', res.error); return; }
    showToast('info', 'Đã gửi lại', `OTP mới: ${res.otp_hint} (Demo)`, 6000);
}
function goBackLogin() {
    document.getElementById('loginStep1').classList.remove('hidden');
    document.getElementById('loginStep2').classList.add('hidden');
}

// ─── Filter Sidebar Toggle ────────────────────────────────────────────────────
document.addEventListener('click', e => {
    if (e.target.classList.contains('filter-title')) e.target.classList.toggle('collapsed');
});

// ─── Keyboard Listener ────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => {
            m.classList.remove('active'); document.body.style.overflow = '';
        });
    }
});
