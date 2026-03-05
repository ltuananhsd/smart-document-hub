# 📚 Smart Document Hub

> **Thư viện tài liệu kinh doanh chuyên nghiệp** — Nền tảng chia sẻ, xem và tải tài liệu chất lượng cao dành cho doanh nghiệp và chuyên gia Việt Nam.

🌐 **Live Demo:** [smart-document-hub.vercel.app](https://smart-document-hub.vercel.app)

---

## ✨ Tính năng nổi bật

| Tính năng | Mô tả |
|---|---|
| 🔍 **Tìm kiếm thông minh** | Tìm theo tiêu đề, mô tả, tags, danh mục và chủ đề |
| 🗂️ **Bộ lọc đa chiều** | Lọc theo danh mục, chủ đề, cấp độ, ngành nghề, quyền truy cập |
| 👁️ **Xem tài liệu** | 3 chế độ: Tải được / Chỉ xem / Demo 30% |
| 🔐 **Xác thực OTP** | Đăng nhập không cần mật khẩu qua OTP 6 số |
| 📊 **Tracking hành vi** | Ghi nhận sự kiện xem, tải, thời gian đọc realtime |
| 🏆 **Lead Scoring tự động** | Tự động tính điểm & phân loại: Hot / Warm / Cold |
| 👤 **Trang hồ sơ** | Quản lý thông tin cá nhân & lịch sử hoạt động |
| 🛡️ **Admin Panel** | Quản lý tài liệu và người dùng (nội bộ) |

---

## 🏗️ Kiến trúc dự án

```
smart-document-hub/
├── index.html          # Trang chủ — danh sách & tìm kiếm tài liệu
├── document.html       # Trang chi tiết tài liệu + preview
├── viewer.html         # Trình xem tài liệu đầy đủ
├── preview.html        # Preview nhanh (Demo 30%)
├── profile.html        # Trang hồ sơ người dùng & hoạt động
├── activity.html       # Lịch sử hoạt động cá nhân
│
├── admin/
│   ├── index.html      # Dashboard Admin
│   ├── documents.html  # Quản lý tài liệu
│   └── users.html      # Quản lý người dùng & leads
│
├── css/
│   └── index.css       # Design system & stylesheet toàn cục
│
├── js/
│   ├── data.js         # Mock data & data access functions
│   ├── auth.js         # OTP auth & session management
│   ├── tracker.js      # Event tracking & lead scoring
│   └── app.js          # UI components & shared utilities
│
└── vercel.json         # Cấu hình deploy Vercel
```

---

## 🧩 Mô tả các module JS

### `js/data.js` — Data Layer
- Bộ **20 tài liệu mẫu** thuộc 7 danh mục: Kinh doanh, Marketing, Tài chính, Nhân sự, Công nghệ, Pháp lý, Vận hành
- Hàm `searchDocuments()` hỗ trợ full-text search + multi-filter
- Dữ liệu được persist qua `localStorage`

### `js/auth.js` — Authentication
- Luồng đăng ký / đăng nhập **OTP không cần mật khẩu**
- OTP có hiệu lực 5 phút, tối đa 3 lần gửi lại
- Session hết hạn sau 7 ngày
- Tự động `upsert` người dùng khi xác thực thành công

### `js/tracker.js` — Event Tracking & Lead Scoring
- Ghi nhận các sự kiện: `doc_view_start`, `doc_heartbeat`, `doc_view_end`, `doc_download_success`
- **Lead Scoring algorithm**: tính điểm dựa trên số lượng xem, thời gian đọc, số lượt tải; áp dụng hệ số suy giảm theo thời gian
- Tự động phân loại lead: **Hot** (>50đ) / **Warm** (11–50đ) / **Cold** (<11đ)
- Tự động cập nhật **Interest Tags** theo chủ đề tài liệu đã tương tác

### `js/app.js` — Shared UI
- Render card tài liệu, modal đăng nhập/OTP
- Toast notifications, helper functions

---

## 🚀 Chạy dự án local

Dự án là **pure static HTML/CSS/JS** — không cần build hay cài đặt dependencies.

```bash
# Clone repository
git clone https://github.com/your-username/smart-document-hub.git
cd smart-document-hub

# Mở với Live Server (VS Code extension) hoặc:
npx serve .
# → Truy cập http://localhost:3000
```

> **Lưu ý:** Do sử dụng `localStorage`, hãy mở qua HTTP server (không mở file trực tiếp từ folder).

---

## ☁️ Deploy lên Vercel

```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Hoặc kết nối GitHub repo trực tiếp tại [vercel.com/new](https://vercel.com/new).

---

## 🗂️ Danh mục & Nội dung tài liệu

| Danh mục | Số tài liệu | Chủ đề nổi bật |
|---|---|---|
| 📈 Kinh doanh | 5 | Chiến lược, B2B SaaS, Customer Success |
| 📣 Marketing | 5 | Digital Marketing, SEO, Growth Hacking |
| 💰 Tài chính | 1 | Báo cáo tài chính, dòng tiền |
| 👥 Nhân sự | 2 | Tuyển dụng, Bảng lương thị trường |
| 💻 Công nghệ | 4 | AI, RPA, UX Research, Power BI |
| ⚖️ Pháp lý | 2 | Hợp đồng quốc tế, Luật lao động |
| ⚙️ Vận hành | 1 | Agile & Scrum |

---

## 🛡️ Quyền truy cập tài liệu

| Chế độ | Ký hiệu | Mô tả |
|---|---|---|
| **DOWNLOAD_ALLOWED** | 🟢 Tải được | Xem đầy đủ + tải về |
| **VIEW_ONLY** | 🔵 Chỉ xem | Chỉ xem online, không tải |
| **DEMO_30** | 🟡 Demo 30% | Preview 30% nội dung đầu |

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage:** `localStorage` (no backend required)
- **Hosting:** [Vercel](https://vercel.com)
- **Fonts & Icons:** CSS Variables, Emoji icons
- **Design:** Custom design system với CSS custom properties

---

## 📸 Screenshots

| Trang chủ | Chi tiết tài liệu | Admin Panel |
|---|---|---|
| Thư viện + bộ lọc đa chiều | Preview nội dung + thông tin | Quản lý tài liệu & users |

---

## 📌 Roadmap

- [ ] Tích hợp backend thực (Node.js / Supabase)
- [ ] Upload tài liệu thực sự (PDF, DOCX, XLSX)
- [ ] Gửi OTP qua email/SMS thật
- [ ] Tìm kiếm full-text với Elasticsearch
- [ ] Phân quyền người dùng (Admin / Editor / Viewer)
- [ ] Thanh toán & gói Premium

---

## 📄 License

MIT License — Tự do sử dụng cho mục đích cá nhân và thương mại.

---

<div align="center">
  Made with ❤️ in Vietnam · <a href="https://smart-document-hub.vercel.app">Live Demo</a>
</div>
