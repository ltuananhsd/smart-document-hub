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

// ─── Document Card Renderer ──────────────────────────────────────────────────
function renderDocCard(doc, linkBase = 'document.html') {
  const icon = FILE_ICONS[doc.file_type] || '📄';
  const gradients = {
    'PDF': 'rgba(239,68,68,0.12), rgba(124,58,237,0.08)',
    'DOCX': 'rgba(79,142,247,0.12), rgba(16,185,129,0.08)',
    'XLSX': 'rgba(16,185,129,0.12), rgba(79,142,247,0.08)',
    'PPT': 'rgba(245,158,11,0.12), rgba(239,68,68,0.08)'
  };
  const grad = gradients[doc.file_type] || gradients['PDF'];
  const user = getCurrentUser();
  const purchased = user ? hasPurchased(user.user_id, doc.doc_id) : false;
  const priceHtml = doc.is_paid
    ? (purchased
      ? `<span style="color:#10b981;font-size:0.72rem;font-weight:700">✅ Đã mua</span>`
      : `<span style="color:#f59e0b;font-size:0.72rem;font-weight:700">${doc.discount_price ? formatPrice(doc.discount_price) : formatPrice(doc.price)}</span>`)
    : `<span style="color:#10b981;font-size:0.72rem;font-weight:700">Miễn phí</span>`;
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
      ${priceHtml}
    </div>
  </div>`;
}

// ─── Payment Modal ───────────────────────────────────────────────────────────
function buildPaymentModal(doc) {
  const finalPrice = doc.discount_price || doc.price;
  return `
  <div id="paymentModal" class="modal-overlay">
    <div class="modal" style="max-width:480px">
      <button class="modal-close" onclick="closeModal('paymentModal')">✕</button>
      <div id="payStep1">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding:16px;background:rgba(255,255,255,0.04);border-radius:var(--radius-md)">
          <span style="font-size:2.2rem">${FILE_ICONS[doc.file_type] || '📄'}</span>
          <div>
            <div style="font-weight:700;font-size:0.95rem;line-height:1.3">${doc.title}</div>
            <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px">${doc.file_type} · ${doc.pages} trang · ${doc.size}</div>
          </div>
        </div>
        <div class="modal-title">🛒 Thanh toán</div>
        <div style="background:linear-gradient(135deg,rgba(79,142,247,0.1),rgba(124,58,237,0.08));border:1px solid var(--border-hover);border-radius:var(--radius-md);padding:16px;margin:16px 0;text-align:center">
          ${doc.price && doc.discount_price ? `<div style="font-size:0.85rem;color:var(--text-muted);text-decoration:line-through;margin-bottom:4px">${formatPrice(doc.price)}</div>` : ''}
          <div style="font-size:2rem;font-weight:800;color:var(--color-primary)">${formatPrice(finalPrice)}</div>
          ${doc.discount_price ? `<div style="font-size:0.78rem;color:#10b981;margin-top:4px">🏷 Tiết kiệm ${formatPrice(doc.price - doc.discount_price)}</div>` : ''}
        </div>
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Phương thức thanh toán</label>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px" id="payMethodGroup">
            <label id="pm1" onclick="selectPayMethod('pm1','Ví điện tử')" style="border:2px solid var(--color-primary);border-radius:var(--radius-md);padding:10px;cursor:pointer;text-align:center;font-size:0.8rem;background:rgba(79,142,247,0.1)">
              <div style="font-size:1.4rem">💳</div>Ví điện tử
            </label>
            <label id="pm2" onclick="selectPayMethod('pm2','Thẻ tín dụng')" style="border:2px solid var(--border);border-radius:var(--radius-md);padding:10px;cursor:pointer;text-align:center;font-size:0.8rem">
              <div style="font-size:1.4rem">🏦</div>Thẻ tín dụng
            </label>
            <label id="pm3" onclick="selectPayMethod('pm3','Chuyển khoản')" style="border:2px solid var(--border);border-radius:var(--radius-md);padding:10px;cursor:pointer;text-align:center;font-size:0.8rem">
              <div style="font-size:1.4rem">📱</div>Chuyển khoản
            </label>
          </div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-muted);text-align:center;margin-bottom:16px">🔒 Giao dịch được bảo mật và mã hóa SSL</div>
        <button id="payConfirmBtn" class="btn btn-primary w-full btn-lg" onclick="confirmPayment('${doc.doc_id}',${finalPrice})">
          💰 Xác nhận thanh toán ${formatPrice(finalPrice)}
        </button>
      </div>
      <div id="payStep2" class="hidden" style="text-align:center;padding:32px 0">
        <div class="spinner" style="width:48px;height:48px;margin:0 auto 20px"></div>
        <div style="font-size:1rem;font-weight:600">Đang xử lý thanh toán...</div>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:8px">Vui lòng không đóng cửa sổ này</div>
      </div>
      <div id="payStep3" class="hidden" style="text-align:center;padding:24px 0">
        <div style="font-size:4rem;margin-bottom:16px">✅</div>
        <div style="font-size:1.3rem;font-weight:800;color:#10b981;margin-bottom:8px">Thanh toán thành công!</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:24px">Tài liệu đã được mở khóa trong tài khoản của bạn</div>
        <button class="btn btn-primary w-full" onclick="afterPayment('${doc.doc_id}')">📥 Tải về ngay</button>
        <button class="btn btn-ghost w-full mt-md" onclick="closeModal('paymentModal')">Đóng</button>
      </div>
    </div>
  </div>`;
}

let _selectedPayMethod = 'Ví điện tử';
function selectPayMethod(id, method) {
  _selectedPayMethod = method;
  ['pm1', 'pm2', 'pm3'].forEach(pid => {
    const el = document.getElementById(pid);
    if (!el) return;
    el.style.border = pid === id ? '2px solid var(--color-primary)' : '2px solid var(--border)';
    el.style.background = pid === id ? 'rgba(79,142,247,0.1)' : '';
  });
}

function openPaymentModal(doc) {
  if (!isLoggedIn()) { openLoginModal(); return; }
  document.querySelectorAll('#paymentModal').forEach(e => e.remove());
  document.body.insertAdjacentHTML('beforeend', buildPaymentModal(doc));
  openModal('paymentModal');
}

function confirmPayment(docId, amount) {
  const btn = document.getElementById('payConfirmBtn');
  if (btn) btn.disabled = true;
  document.getElementById('payStep1').classList.add('hidden');
  document.getElementById('payStep2').classList.remove('hidden');
  setTimeout(() => {
    const user = getCurrentUser();
    if (user) createOrder(user.user_id, docId, amount, _selectedPayMethod);
    document.getElementById('payStep2').classList.add('hidden');
    document.getElementById('payStep3').classList.remove('hidden');
    showToast('success', 'Thanh toán thành công!', 'Tài liệu đã được mở khóa 🎉', 5000);
  }, 1800);
}

function afterPayment(docId) {
  closeModal('paymentModal');
  const btn = document.getElementById('btnDownload') || document.getElementById('btnPayBuy');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Đang chuẩn bị...'; }
  requestDownload(docId);
  showToast('success', 'Đang tải về...', 'File của bạn đã sẵn sàng (Demo mode)');
  setTimeout(() => window.location.reload(), 1500);
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
