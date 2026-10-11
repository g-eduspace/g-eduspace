/* ==========================================================================
   G-EDUSPACE: DANH BẠ DỮ LIỆU CÁC ỨNG DỤNG SỐ
   Quản lý danh sách ứng dụng độc lập - Dễ dàng thêm mới, chỉnh sửa
   ========================================================================== */

const APPS_DATA = [
  {
    id: "khtn-bohr-atom",
    title: "Mô phỏng Mô hình Nguyên tử Bohr & Bảng tuần hoàn",
    category: "khtn",
    categoryName: "Mô phỏng KHTN",
    grade: "Lớp 7",
    subject: "Khoa học tự nhiên",
    badge: "Chuẩn Vàng KHTN",
    badgeType: "primary",
    thumbnailIcon: "atom",
    description: "Khám phá cấu tạo nguyên tử của 20 nguyên tố đầu tiên, quan sát electron chuyển động trên các lớp quỹ đạo, bảng tra cứu IUPAC và phát âm quốc tế chuẩn sư phạm.",
    tags: ["KHTN 7", "Hóa học", "Mô hình Bohr", "100vh Zero-Scroll"],
    url: "apps/khtn-bohr-atom/index.html",
    featured: true,
    version: "v2.0",
    author: "Thầy Giang"
  },
  {
    id: "ai-tro-ly-giao-vien",
    title: "Trợ lý AI Sư phạm: Soạn Đề & Ý tưởng Bài giảng",
    category: "ai",
    categoryName: "Trí tuệ nhân tạo (AI)",
    grade: "Liên khối",
    subject: "Tất cả các môn",
    badge: "Gemini AI",
    badgeType: "ai",
    thumbnailIcon: "sparkles",
    description: "Ứng dụng AI hỗ trợ giáo viên tự động thiết kế câu hỏi trắc nghiệm 4 mức độ, xây dựng hoạt động khởi động cuốn hút và lập kế hoạch bài dạy chuẩn GDPT 2018.",
    tags: ["Gemini Pro", "Soạn đề", "Ý tưởng khởi động", "GDPT 2018"],
    url: "apps/ai-tro-ly-giao-vien/index.html",
    featured: true,
    version: "v1.2",
    author: "G-EduSpace AI"
  },
  {
    id: "thoi-khoa-bieu",
    title: "Tra cứu Thời khóa biểu Toàn trường & Cá nhân",
    category: "tools",
    categoryName: "Tiện ích Sư phạm",
    grade: "Toàn trường",
    subject: "Quản lý & Giảng dạy",
    badge: "Lịch Dạy - Lịch Học",
    badgeType: "warning",
    thumbnailIcon: "calendar",
    description: "Hệ thống tra cứu thời khóa biểu thông minh: tra cứu nhanh theo từng lớp hoặc theo từng giáo viên, tự động làm nổi bật ngày dạy hôm nay và hỗ trợ in ấn nhanh.",
    tags: ["Thời khóa biểu", "Lịch dạy", "Tra cứu theo giáo viên", "In ấn"],
    url: "apps/thoi-khoa-bieu/index.html",
    featured: true,
    version: "v1.0",
    author: "G-EduSpace"
  },
  {
    id: "tien-ich-xep-nhom",
    title: "Vòng xoay Gọi tên & Chia nhóm Học tập",
    category: "tools",
    categoryName: "Tiện ích Sư phạm",
    grade: "Tất cả",
    subject: "Dạy học tích cực",
    badge: "Tiện ích lớp học",
    badgeType: "success",
    thumbnailIcon: "users",
    description: "Công cụ chọn ngẫu nhiên học sinh phát biểu, quay số may mắn và tự động chia nhóm thảo luận công bằng, tạo không khí sôi nổi trong giờ học.",
    tags: ["Tương tác lớp", "Chia nhóm", "Quay số ngẫu nhiên"],
    url: "apps/tien-ich-lop-hoc/index.html",
    featured: false,
    version: "v1.0",
    author: "G-EduSpace"
  }
];

// Định nghĩa danh mục phân loại
const CATEGORIES = [
  { id: "all", name: "Tất cả ứng dụng", icon: "grid" },
  { id: "khtn", name: "Mô phỏng KHTN", icon: "flask" },
  { id: "ai", name: "Trợ lý AI Giáo viên", icon: "cpu" },
  { id: "tools", name: "Tiện ích Sư phạm", icon: "wrench" }
];
