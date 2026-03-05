// ═══════════════════════════════════════
//  MOCK DATA — Smart Document Hub
// ═══════════════════════════════════════
'use strict';

const CATEGORIES = ['Kinh doanh', 'Marketing', 'Tài chính', 'Nhân sự', 'Công nghệ', 'Pháp lý', 'Vận hành'];
const TOPICS     = ['AI & Tự động hóa', 'Chiến lược', 'Bán hàng', 'Kế toán', 'Tuyển dụng', 'Luật lao động', 'Quy trình', 'Phân tích dữ liệu', 'Digital Marketing', 'B2B/B2C'];
const LEVELS     = ['Cơ bản', 'Trung cấp', 'Chuyên gia'];
const INDUSTRIES = ['Tài chính', 'Công nghệ', 'Bán lẻ', 'Sản xuất', 'Giáo dục', 'Y tế', 'Đa ngành'];
const FILE_TYPES = ['PDF', 'DOCX', 'XLSX', 'PPT'];
const FILE_ICONS = { PDF: '📄', DOCX: '📝', XLSX: '📊', PPT: '📑' };
const ACCESS_MODES = { VIEW_ONLY: 'VIEW_ONLY', DOWNLOAD: 'DOWNLOAD_ALLOWED', DEMO: 'DEMO_30' };

const DOCUMENTS = [
  {
    doc_id: 'doc-001', title: 'Báo cáo Thị trường AI Việt Nam 2024',
    category: 'Công nghệ', topic: 'AI & Tự động hóa', level: 'Chuyên gia', industry: 'Công nghệ',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 2,
    file_type: 'PDF', tags: ['AI', 'Thị trường', 'Báo cáo', 'Phân tích'],
    description: 'Phân tích toàn diện thị trường trí tuệ nhân tạo tại Việt Nam: xu hướng, cơ hội, thách thức và dự báo tăng trưởng đến 2027. Bao gồm case study từ 50+ doanh nghiệp tiên phong.',
    pages: 48, size: '4.2 MB', view_count: 2847, download_count: 612,
    published_at: '2024-11-15', updated_at: '2024-12-01',
    content_preview: `
      <h2>1. Tổng quan thị trường AI Việt Nam</h2>
      <p>Năm 2024, thị trường AI Việt Nam đạt quy mô ước tính <strong>850 triệu USD</strong>, tăng trưởng 38% so với cùng kỳ năm trước. Việt Nam đang nổi lên như một trong những trung tâm AI phát triển nhanh nhất khu vực Đông Nam Á.</p>
      <h3>Các lĩnh vực dẫn đầu</h3>
      <ul>
        <li><strong>Fintech & Banking:</strong> 34% tổng đầu tư AI</li>
        <li><strong>E-commerce & Retail:</strong> 28% — tăng trưởng mạnh sau COVID</li>
        <li><strong>Healthcare Tech:</strong> 18% — tiềm năng cao, còn non trẻ</li>
        <li><strong>Manufacturing:</strong> 15% — xu hướng Industry 4.0</li>
        <li><strong>Khác:</strong> 5%</li>
      </ul>
      <h2>2. Xu hướng nổi bật 2024–2025</h2>
      <p>Generative AI đang thay đổi cách doanh nghiệp Việt Nam tiếp cận nội dung, dịch vụ khách hàng và tự động hóa quy trình nội bộ. <strong>73% doanh nghiệp</strong> được khảo sát đã thử nghiệm ít nhất một giải pháp AI trong năm 2024...</p>
    `
  },
  {
    doc_id: 'doc-002', title: 'Hướng dẫn Digital Marketing B2B 2024',
    category: 'Marketing', topic: 'Digital Marketing', level: 'Trung cấp', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['Marketing', 'B2B', 'Digital', 'Lead Generation'],
    description: 'Cẩm nang thực chiến Digital Marketing cho doanh nghiệp B2B: xây dựng content strategy, tối ưu SEO kỹ thuật, chạy quảng cáo LinkedIn, và nurturing pipeline hiệu quả.',
    pages: 62, size: '6.8 MB', view_count: 1923, download_count: 445,
    published_at: '2024-10-20', updated_at: '2024-10-20',
    content_preview: `
      <h2>Phần 1: Chiến lược Content B2B</h2>
      <p>Khác với B2C — nơi cảm xúc dẫn dắt quyết định — B2B đòi hỏi nội dung <strong>giáo dục, chứng minh được ROI</strong> và xây dựng uy tín chuyên môn. Buyer journey B2B trung bình kéo dài <strong>3–9 tháng</strong> với nhiều stakeholder tham gia.</p>
      <h3>Content Funnel B2B</h3>
      <ul>
        <li><strong>ToFu (Awareness):</strong> Blog, Podcast, Webinar, Industry Report</li>
        <li><strong>MoFu (Consideration):</strong> Case Study, Whitepaper, Demo Video, ROI Calculator</li>
        <li><strong>BoFu (Decision):</strong> Free Trial, Proposal Template, Customer Testimonial</li>
      </ul>
      <p>Doanh nghiệp B2B triển khai chiến lược content đồng bộ đạt <strong>68% nhiều leads hơn</strong> so với nhóm không có chiến lược...</p>
    `
  },
  {
    doc_id: 'doc-003', title: 'Template Hợp đồng Thương mại Quốc tế',
    category: 'Pháp lý', topic: 'Quy trình', level: 'Chuyên gia', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DEMO, status: 'PUBLISHED', version: 3,
    file_type: 'DOCX', tags: ['Hợp đồng', 'Pháp lý', 'Xuất nhập khẩu', 'Template'],
    description: 'Bộ template hợp đồng thương mại quốc tế đa ngôn ngữ (Việt-Anh), đã qua thẩm định pháp lý. Bao gồm: NDA, Distribution Agreement, Service Contract, Manufacturing Agreement.',
    pages: 35, size: '1.9 MB', view_count: 3102, download_count: 287,
    published_at: '2024-09-05', updated_at: '2024-11-10',
    content_preview: `
      <h2>NON-DISCLOSURE AGREEMENT (NDA)</h2>
      <p>This Non-Disclosure Agreement ("Agreement") is entered into as of [DATE] between [PARTY A] and [PARTY B] (collectively, the "Parties").</p>
      <h3>1. Definition of Confidential Information</h3>
      <p>"Confidential Information" means any information disclosed by either Party to the other Party, either directly or indirectly, in writing, orally or by inspection of tangible objects...</p>
      <h3>2. Obligations of Receiving Party</h3>
      <p>The Receiving Party agrees to: (i) hold the Confidential Information in strict confidence; (ii) not to disclose the Confidential Information to any third parties; (iii) use the Confidential Information solely for the Purpose...</p>
    `
  },
  {
    doc_id: 'doc-004', title: 'Báo cáo Tài chính & Phân tích Dòng tiền Q3/2024',
    category: 'Tài chính', topic: 'Kế toán', level: 'Trung cấp', industry: 'Tài chính',
    access_mode: ACCESS_MODES.VIEW_ONLY, status: 'PUBLISHED', version: 1,
    file_type: 'XLSX', tags: ['Tài chính', 'Cashflow', 'Báo cáo', 'Q3'],
    description: 'Báo cáo phân tích dòng tiền, P&L, balance sheet quý 3/2024 kèm dashboard Excel tự động. Phù hợp cho CFO, kế toán trưởng và nhà đầu tư.',
    pages: 18, size: '3.5 MB', view_count: 876, download_count: 134,
    published_at: '2024-10-15', updated_at: '2024-10-15',
    content_preview: `<h2>Tóm tắt Tài chính Q3/2024</h2><p>Doanh thu thuần: <strong>45.2 tỷ VNĐ</strong> (+12% YoY). Lợi nhuận gộp: <strong>18.8 tỷ VNĐ</strong> (41.6% margin). EBITDA: <strong>11.3 tỷ VNĐ</strong>...</p>`
  },
  {
    doc_id: 'doc-005', title: 'Quy trình Tuyển dụng & Onboarding Nhân sự',
    category: 'Nhân sự', topic: 'Tuyển dụng', level: 'Cơ bản', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 2,
    file_type: 'PDF', tags: ['HR', 'Tuyển dụng', 'Onboarding', 'Quy trình'],
    description: 'Bộ SOP tuyển dụng & onboarding đầy đủ: JD template, scoring card phỏng vấn, checklist onboarding 30-60-90 ngày, và kpi theo dõi hiệu quả tuyển dụng.',
    pages: 29, size: '2.1 MB', view_count: 1456, download_count: 389,
    published_at: '2024-08-20', updated_at: '2024-09-01',
    content_preview: `<h2>1. Quy trình Tuyển dụng 7 Bước</h2><p>Bước 1: Phê duyệt headcount → Bước 2: Đăng tuyển đa kênh → Bước 3: Sơ tuyển CV → Bước 4: Vòng 1 (HR) → Bước 5: Vòng 2 (Chuyên môn) → Bước 6: Offer → Bước 7: Onboarding</p>`
  },
  {
    doc_id: 'doc-006', title: 'Chiến lược Kinh doanh B2B SaaS 2025',
    category: 'Kinh doanh', topic: 'Chiến lược', level: 'Chuyên gia', industry: 'Công nghệ',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 1,
    file_type: 'PPT', tags: ['SaaS', 'Chiến lược', 'B2B', 'Go-to-market'],
    description: 'Bộ slide chiến lược GTM (Go-to-Market) cho SaaS B2B tại thị trường SEA: định vị sản phẩm, pricing strategy, sales motion, và growth playbook từ $0 đến $1M ARR.',
    pages: 56, size: '8.9 MB', view_count: 2341, download_count: 521,
    published_at: '2024-12-01', updated_at: '2024-12-01',
    content_preview: `<h2>Go-To-Market Strategy Framework</h2><p><strong>Phase 1 - ICP Focus:</strong> Xác định Ideal Customer Profile, tập trung 100% nguồn lực vào 1 segment. <strong>Phase 2 - Land & Expand:</strong> Chốt 10 khách hàng anchor, thu thập feedback, iterate product...</p>`
  },
  {
    doc_id: 'doc-007', title: 'Hướng dẫn SEO & Content Marketing 2024',
    category: 'Marketing', topic: 'Digital Marketing', level: 'Trung cấp', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['SEO', 'Content', 'Google', 'Keyword'],
    description: 'Playbook SEO kỹ thuật và chiến lược content: keyword research, on-page optimization, link building, Core Web Vitals, và cách viết content rank top Google.',
    pages: 41, size: '3.7 MB', view_count: 1678, download_count: 398,
    published_at: '2024-07-10', updated_at: '2024-11-05',
    content_preview: `<h2>Chapter 1: Technical SEO Checklist 2024</h2><p>Trước khi đầu tư content, hãy đảm bảo nền tảng kỹ thuật vững chắc. Google không thể rank trang bạn không crawl được...</p>`
  },
  {
    doc_id: 'doc-008', title: 'Nghiên cứu Người dùng UX: Phương pháp & Template',
    category: 'Công nghệ', topic: 'Phân tích dữ liệu', level: 'Trung cấp', industry: 'Công nghệ',
    access_mode: ACCESS_MODES.DEMO, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['UX', 'Research', 'User Interview', 'Usability'],
    description: 'Bộ tài liệu nghiên cứu người dùng: user interview guide, affinity mapping, usability testing script, phân tích hành vi và tổng hợp insight thành design decision.',
    pages: 33, size: '2.8 MB', view_count: 954, download_count: 178,
    published_at: '2024-09-22', updated_at: '2024-09-22',
    content_preview: `<h2>User Research Methods Overview</h2><p>Lựa chọn phương pháp đúng phụ thuộc vào câu hỏi bạn cần trả lời: <strong>Qualitative</strong> (Tại sao?) hay <strong>Quantitative</strong> (Bao nhiêu? Có bao nhiêu người?)...</p>`
  },
  {
    doc_id: 'doc-009', title: 'Bộ KPI & OKR Framework Doanh nghiệp',
    category: 'Kinh doanh', topic: 'Chiến lược', level: 'Trung cấp', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 2,
    file_type: 'XLSX', tags: ['KPI', 'OKR', 'Performance', 'Quản trị'],
    description: 'Bộ KPI dashboard + OKR template cho 6 phòng ban: Sales, Marketing, Product, Engineering, HR, Finance. Kèm hướng dẫn cascade từ Company → Team → Individual.',
    pages: 22, size: '4.1 MB', view_count: 2156, download_count: 567,
    published_at: '2024-01-10', updated_at: '2024-06-15',
    content_preview: `<h2>OKR Framework</h2><p><strong>Objectives</strong> = Kết quả mong muốn (định tính, đầy cảm hứng). <strong>Key Results</strong> = Cách đo lường (định lượng, có deadline). Nguyên tắc: 3–5 Objectives, mỗi Objective có 3–4 Key Results...</p>`
  },
  {
    doc_id: 'doc-010', title: 'Luật Lao động 2024: Cập nhật & Hướng dẫn',
    category: 'Pháp lý', topic: 'Luật lao động', level: 'Cơ bản', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.VIEW_ONLY, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['Luật', 'Lao động', 'HĐLĐ', 'BHXH'],
    description: 'Tóm tắt các thay đổi quan trọng trong Bộ luật Lao động và các nghị định liên quan năm 2024: quy định HĐLĐ, thời gian làm việc, tiền lương tối thiểu, BHXH-YT-TN.',
    pages: 25, size: '1.6 MB', view_count: 1234, download_count: 0,
    published_at: '2024-03-01', updated_at: '2024-07-01',
    content_preview: `<h2>Những thay đổi quan trọng 2024</h2><p>1. <strong>Lương tối thiểu vùng</strong> tăng 6% từ ngày 01/07/2024: Vùng I: 4.96 triệu, Vùng II: 4.41 triệu, Vùng III: 3.86 triệu, Vùng IV: 3.45 triệu...</p>`
  },
  {
    doc_id: 'doc-011', title: 'Tự động hóa Quy trình RPA & AI Agent',
    category: 'Công nghệ', topic: 'AI & Tự động hóa', level: 'Chuyên gia', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['RPA', 'AI Agent', 'Automation', 'Process'],
    description: 'Hướng dẫn triển khai tự động hóa quy trình doanh nghiệp: so sánh RPA vs AI Agent, use case theo ngành, ROI calculation framework, và lộ trình triển khai 90 ngày.',
    pages: 54, size: '5.4 MB', view_count: 1897, download_count: 423,
    published_at: '2024-11-01', updated_at: '2024-11-01',
    content_preview: `<h2>RPA vs AI Agent: Khi nào dùng gì?</h2><p><strong>RPA</strong> phù hợp khi: quy trình cố định, có rule rõ ràng, input structured. <strong>AI Agent</strong> phù hợp khi: cần judgment, xử lý unstructured data, adaptive workflow...</p>`
  },
  {
    doc_id: 'doc-012', title: 'Chiến lược Pricing & Revenue Model SaaS',
    category: 'Kinh doanh', topic: 'Bán hàng', level: 'Chuyên gia', industry: 'Công nghệ',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 1,
    file_type: 'PPT', tags: ['Pricing', 'SaaS', 'Revenue', 'Monetization'],
    description: 'Phân tích và so sánh các mô hình pricing SaaS: per-seat, usage-based, freemium, tiered packaging. Kèm framework chọn mô hình và tối ưu revenue theo giai đoạn tăng trưởng.',
    pages: 38, size: '6.2 MB', view_count: 1543, download_count: 312,
    published_at: '2024-12-10', updated_at: '2024-12-10',
    content_preview: `<h2>Pricing Strategy Framework</h2><p>Không có một mô hình pricing "đúng" cho tất cả. Key question: <em>Customers gain value theo đơn vị nào?</em> → Đó là basis of pricing tốt nhất của bạn...</p>`
  },
  {
    doc_id: 'doc-013', title: 'Xây dựng Đội ngũ Sales B2B Hiệu quả',
    category: 'Kinh doanh', topic: 'Bán hàng', level: 'Trung cấp', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['Sales', 'Team Building', 'B2B', 'CRM'],
    description: 'Cẩm nang xây dựng đội sales B2B: cấu trúc team, profile tuyển dụng, onboarding playbook, comp & quota design, coaching framework, và CRM workflow.',
    pages: 47, size: '4.8 MB', view_count: 1289, download_count: 267,
    published_at: '2024-05-15', updated_at: '2024-09-01',
    content_preview: `<h2>Cấu trúc Team Sales B2B</h2><p>Mô hình phổ biến: <strong>SDR</strong> (Prospecting) → <strong>AE</strong> (Closing) → <strong>CSM</strong> (Retention). Tỷ lệ lý tưởng: 2–3 SDR / AE, 1 CSM / 50 accounts...</p>`
  },
  {
    doc_id: 'doc-014', title: 'Data Analytics Dashboard với Power BI',
    category: 'Công nghệ', topic: 'Phân tích dữ liệu', level: 'Trung cấp', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DEMO, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['Power BI', 'Dashboard', 'Data', 'Analytics'],
    description: 'Hướng dẫn từ A-Z xây dựng dashboard phân tích kinh doanh với Power BI: kết nối data source, DAX cơ bản, thiết kế visual, chia sẻ report và embedded analytics.',
    pages: 58, size: '7.2 MB', view_count: 1034, download_count: 198,
    published_at: '2024-08-01', updated_at: '2024-10-15',
    content_preview: `<h2>1. Giới thiệu Power BI Desktop</h2><p>Power BI Desktop là công cụ miễn phí của Microsoft để tạo report & dashboard. Luồng làm việc cơ bản: <strong>Get Data → Transform → Model → Visualize → Publish</strong>...</p>`
  },
  {
    doc_id: 'doc-015', title: 'Email Marketing Automation: Từ 0 đến 10K Subscriber',
    category: 'Marketing', topic: 'Digital Marketing', level: 'Cơ bản', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['Email', 'Marketing', 'Automation', 'Newsletter'],
    description: 'Playbook email marketing: lead magnet, list building, segmentation, sequence design, A/B testing, deliverability optimization, và đo lường hiệu quả campaign.',
    pages: 36, size: '3.2 MB', view_count: 2089, download_count: 478,
    published_at: '2024-06-20', updated_at: '2024-08-10',
    content_preview: `<h2>Tại sao Email Marketing vẫn Win?</h2><p>ROI trung bình của email marketing: <strong>$42 cho mỗi $1 đầu tư</strong>. Open rate email (22.1%) cao gấp 6x organic reach Facebook (3.8%)...</p>`
  },
  {
    doc_id: 'doc-016', title: 'Quản lý Dự án Agile & Scrum Toàn tập',
    category: 'Vận hành', topic: 'Quy trình', level: 'Trung cấp', industry: 'Công nghệ',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 2,
    file_type: 'PDF', tags: ['Agile', 'Scrum', 'Project Management', 'Sprint'],
    description: 'Cẩm nang Agile/Scrum đầy đủ: events, artifacts, roles, ceremonies. Kèm template Sprint Planning, Retrospective, Daily Standup và cách scale Agile cho team lớn.',
    pages: 44, size: '3.9 MB', view_count: 1567, download_count: 356,
    published_at: '2024-04-01', updated_at: '2024-09-15',
    content_preview: `<h2>Scrum Framework Overview</h2><p><strong>3 Roles:</strong> Product Owner, Scrum Master, Development Team. <strong>5 Events:</strong> Sprint, Planning, Daily Scrum, Review, Retrospective. <strong>3 Artifacts:</strong> Product Backlog, Sprint Backlog, Increment...</p>`
  },
  {
    doc_id: 'doc-017', title: 'Chiến lược Xây dựng Thương hiệu Cá nhân (Personal Branding)',
    category: 'Marketing', topic: 'Chiến lược', level: 'Cơ bản', industry: 'Đa ngành',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['Personal Branding', 'LinkedIn', 'Thought Leadership'],
    description: 'Framework xây dựng personal brand từ số 0: định vị, content pillar, LinkedIn optimization, public speaking, và monetization qua thương hiệu cá nhân.',
    pages: 31, size: '2.6 MB', view_count: 3241, download_count: 734,
    published_at: '2024-02-14', updated_at: '2024-07-01',
    content_preview: `<h2>Tại sao Personal Brand trong thời AI?</h2><p>Khi AI làm được mọi thứ, <em>con người làm được gì?</em> Câu trả lời: <strong>Perspective, Story, Trust.</strong> Personal brand là tài sản AI không thể copy được của bạn...</p>`
  },
  {
    doc_id: 'doc-018', title: 'Growth Hacking Playbook: 100 tactic tăng trưởng',
    category: 'Marketing', topic: 'Bán hàng', level: 'Trung cấp', industry: 'Công nghệ',
    access_mode: ACCESS_MODES.DEMO, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['Growth', 'Tactic', 'Startup', 'Viral'],
    description: '100 growth tactics được categorize theo AARRR funnel (Acquisition, Activation, Retention, Revenue, Referral). Mỗi tactic kèm: effort level, expected impact, và ví dụ thực tế.',
    pages: 89, size: '9.1 MB', view_count: 4102, download_count: 891,
    published_at: '2024-01-05', updated_at: '2024-09-20',
    content_preview: `<h2>AARRR Framework</h2><p>Dave McClure's Pirate Metrics đã trở thành ngôn ngữ chung của growth team. Bắt đầu bằng cách measure baseline cho mỗi stage: <strong>Acquisition</strong> (CAC), <strong>Activation</strong> (Aha moment rate), <strong>Retention</strong> (Day 1/7/30), <strong>Revenue</strong> (ARPU, LTV), <strong>Referral</strong> (NPS, Viral coefficient)...</p>`
  },
  {
    doc_id: 'doc-019', title: 'Bảng lương & Cơ cấu Comp Thị trường Tech 2024',
    category: 'Nhân sự', topic: 'Tuyển dụng', level: 'Trung cấp', industry: 'Công nghệ',
    access_mode: ACCESS_MODES.VIEW_ONLY, status: 'PUBLISHED', version: 1,
    file_type: 'XLSX', tags: ['Lương', 'Compensation', 'Tech', 'Market Data'],
    description: 'Khảo sát lương thị trường tech Việt Nam 2024: từ Fresher đến Director theo role (Dev, PM, Data, Design, Sales). Bao gồm fixed, bonus structure, equity và total comp benchmark.',
    pages: 14, size: '2.8 MB', view_count: 5892, download_count: 0,
    published_at: '2024-03-20', updated_at: '2024-10-01',
    content_preview: `<h2>Software Engineer Salary Benchmark 2024</h2><p>Junior (0-2y): 12–20M VNĐ. Middle (3-5y): 25–45M VNĐ. Senior (5+y): 50–85M VNĐ. Tech Lead: 80–130M VNĐ. Engineering Manager: 120–200M+ VNĐ...</p>`
  },
  {
    doc_id: 'doc-020', title: 'Xây dựng Customer Success & Churn Reduction',
    category: 'Kinh doanh', topic: 'B2B/B2C', level: 'Trung cấp', industry: 'Công nghệ',
    access_mode: ACCESS_MODES.DOWNLOAD, status: 'PUBLISHED', version: 1,
    file_type: 'PDF', tags: ['Customer Success', 'Churn', 'Retention', 'SaaS'],
    description: 'Playbook Customer Success: health score design, churn prediction signals, intervention playbook (red → yellow → green), QBR template và expansion revenue tactic.',
    pages: 43, size: '4.4 MB', view_count: 1123, download_count: 234,
    published_at: '2024-10-05', updated_at: '2024-10-05',
    content_preview: `<h2>Customer Health Score</h2><p>Không có "one-size-fits-all" health score. Bắt đầu với 3–5 signals quan trọng nhất với business bạn: <strong>Product usage frequency, Support ticket volume, NPS, Contract renewal probability...</strong></p>`
  }
];

const USERS = [
  {
    user_id: 'u-001', customer_id: 'cust-2401001',
    name: 'Nguyễn Minh Tuấn', phone: '0901234567', email: 'tuan.nguyen@techcorp.vn',
    position: 'Marketing Manager', industry: 'Công nghệ', consent_email: true,
    lead_score: 87, lead_stage: 'Hot',
    tags: ['Interest_AI_MKT', 'Interest_Digital', 'Interest_Strategy'],
    created_at: '2024-10-15T10:30:00Z', last_active: '2025-01-03T14:22:00Z'
  },
  {
    user_id: 'u-002', customer_id: 'cust-2401002',
    name: 'Trần Thị Lan Anh', phone: '0912345678', email: 'lan.anh@startup.io',
    position: 'Founder & CEO', industry: 'Tài chính', consent_email: true,
    lead_score: 45, lead_stage: 'Warm',
    tags: ['Interest_Strategy', 'Interest_SaaS'],
    created_at: '2024-11-01T09:15:00Z', last_active: '2025-01-02T11:40:00Z'
  },
  {
    user_id: 'u-003', customer_id: 'cust-2401003',
    name: 'Lê Văn Hùng', phone: '0987654321', email: 'hung.le@company.com',
    position: 'Sales Director', industry: 'Bán lẻ', consent_email: false,
    lead_score: 8, lead_stage: 'Cold',
    tags: [],
    created_at: '2024-12-05T13:00:00Z', last_active: '2024-12-06T08:00:00Z'
  },
  {
    user_id: 'u-004', customer_id: 'cust-2401004',
    name: 'Phạm Thị Hoa', phone: '0978901234', email: 'hoa.pham@edu.vn',
    position: 'HR Manager', industry: 'Giáo dục', consent_email: true,
    lead_score: 62, lead_stage: 'Hot',
    tags: ['Interest_HR', 'Interest_Training'],
    created_at: '2024-09-20T16:00:00Z', last_active: '2025-01-04T09:30:00Z'
  },
  {
    user_id: 'u-005', customer_id: 'cust-2401005',
    name: 'Đặng Quốc Bảo', phone: '0965432109', email: 'bao.dang@finance.vn',
    position: 'CFO', industry: 'Tài chính', consent_email: true,
    lead_score: 28, lead_stage: 'Warm',
    tags: ['Interest_Finance', 'Interest_Legal'],
    created_at: '2024-10-30T11:00:00Z', last_active: '2024-12-28T15:00:00Z'
  }
];

const EVENT_LOGS = [
  { event_id:'ev-001', user_id:'u-001', doc_id:'doc-001', event_type:'doc_view_start', session_id:'s-001', duration_sec:0, created_at:'2025-01-03T14:00:00Z' },
  { event_id:'ev-002', user_id:'u-001', doc_id:'doc-001', event_type:'doc_heartbeat', session_id:'s-001', duration_sec:65, created_at:'2025-01-03T14:01:05Z' },
  { event_id:'ev-003', user_id:'u-001', doc_id:'doc-001', event_type:'doc_view_end', session_id:'s-001', duration_sec:210, created_at:'2025-01-03T14:03:30Z' },
  { event_id:'ev-004', user_id:'u-001', doc_id:'doc-001', event_type:'doc_download_success', session_id:'s-001', duration_sec:0, created_at:'2025-01-03T14:03:45Z' },
  { event_id:'ev-005', user_id:'u-001', doc_id:'doc-002', event_type:'doc_view_start', session_id:'s-002', duration_sec:0, created_at:'2025-01-03T14:10:00Z' },
  { event_id:'ev-006', user_id:'u-001', doc_id:'doc-002', event_type:'doc_view_end', session_id:'s-002', duration_sec:185, created_at:'2025-01-03T14:13:05Z' },
  { event_id:'ev-007', user_id:'u-002', doc_id:'doc-006', event_type:'doc_view_start', session_id:'s-003', duration_sec:0, created_at:'2025-01-02T11:00:00Z' },
  { event_id:'ev-008', user_id:'u-002', doc_id:'doc-006', event_type:'doc_download_success', session_id:'s-003', duration_sec:0, created_at:'2025-01-02T11:05:00Z' },
  { event_id:'ev-009', user_id:'u-004', doc_id:'doc-005', event_type:'doc_download_success', session_id:'s-004', duration_sec:0, created_at:'2025-01-04T09:00:00Z' },
  { event_id:'ev-010', user_id:'u-004', doc_id:'doc-019', event_type:'doc_view_start', session_id:'s-005', duration_sec:0, created_at:'2025-01-04T09:15:00Z' },
];

// ─── DATA ACCESS FUNCTIONS ───────────────────────────────────────────────────

function getAllDocuments() {
  const stored = localStorage.getItem('dh_documents');
  return stored ? JSON.parse(stored) : DOCUMENTS;
}

function getDocument(docId) {
  return getAllDocuments().find(d => d.doc_id === docId) || null;
}

function saveDocuments(docs) {
  localStorage.setItem('dh_documents', JSON.stringify(docs));
}

function getAllUsers() {
  const stored = localStorage.getItem('dh_users');
  return stored ? JSON.parse(stored) : USERS;
}

function getUser(userId) {
  return getAllUsers().find(u => u.user_id === userId) || null;
}

function saveUsers(users) {
  localStorage.setItem('dh_users', JSON.stringify(users));
}

function getEventLogs() {
  const stored = localStorage.getItem('dh_events');
  return stored ? JSON.parse(stored) : EVENT_LOGS;
}

function searchDocuments({ query = '', category = '', topic = '', level = '', industry = '', access_mode = '' } = {}) {
  let docs = getAllDocuments().filter(d => d.status === 'PUBLISHED');
  const q = query.trim().toLowerCase();
  if (q) docs = docs.filter(d =>
    d.title.toLowerCase().includes(q) ||
    d.description.toLowerCase().includes(q) ||
    d.tags.some(t => t.toLowerCase().includes(q)) ||
    d.category.toLowerCase().includes(q) ||
    d.topic.toLowerCase().includes(q)
  );
  if (category)    docs = docs.filter(d => d.category === category);
  if (topic)       docs = docs.filter(d => d.topic === topic);
  if (level)       docs = docs.filter(d => d.level === level);
  if (industry)    docs = docs.filter(d => d.industry === industry);
  if (access_mode) docs = docs.filter(d => d.access_mode === access_mode);
  return docs;
}

function getRelatedDocuments(docId, limit = 4) {
  const doc = getDocument(docId);
  if (!doc) return [];
  return getAllDocuments()
    .filter(d => d.doc_id !== docId && d.status === 'PUBLISHED' && (d.topic === doc.topic || d.category === doc.category))
    .slice(0, limit);
}

function initData() {
  if (!localStorage.getItem('dh_documents')) saveDocuments(DOCUMENTS);
  if (!localStorage.getItem('dh_users')) saveUsers(USERS);
  if (!localStorage.getItem('dh_events')) localStorage.setItem('dh_events', JSON.stringify(EVENT_LOGS));
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

const AccessLabel = {
  'DOWNLOAD_ALLOWED': 'Tải được',
  'VIEW_ONLY':        'Chỉ xem',
  'DEMO_30':          'Demo 30%'
};
const AccessClass = {
  'DOWNLOAD_ALLOWED': 'access-download',
  'VIEW_ONLY':        'access-view',
  'DEMO_30':          'access-demo'
};
const LeadBadge = {
  'Hot':  'badge-hot',
  'Warm': 'badge-warm',
  'Cold': 'badge-cold'
};

function formatNum(n) {
  if (n >= 1000) return (n/1000).toFixed(1) + 'K';
  return String(n);
}
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  const days = Math.floor(hrs / 24);
  return `${days} ngày trước`;
}
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
}
