# G-EduSpace • Không Gian Giáo Dục & Ứng Dụng Số

Chào mừng Thầy Giang đến với **G-EduSpace**! Đây là cổng thông tin và trung tâm điều phối học liệu số, mô phỏng KHTN và công cụ trợ lý AI dành cho giáo viên.

---

## 🚀 Cách mở và chạy thử ngay trên máy tính

1. **Cách 1 (Nhanh nhất):** Nhấp đúp chuột vào file `Mở G-EduSpace.bat` trong thư mục này.
2. **Cách 2:** Mở trực tiếp file `index.html` bằng trình duyệt web (Google Chrome, Microsoft Edge, Cốc Cốc).

---

## 📂 Cấu trúc thư mục

- `index.html`: Giao diện Cổng trung tâm G-EduSpace.
- `css/style.css`: Bộ giao diện chuẩn Sư phạm (Educational Bright Theme), tối ưu từ Laptop đến TV 55".
- `js/apps-data.js`: Danh bạ quản lý danh mục ứng dụng (Thêm/bớt app chỉ cần sửa file này).
- `js/app.js`: Xử lý tìm kiếm, lọc danh mục, xem thử modal và tương tác.
- `apps/`:
  - `khtn-bohr-atom/`: Mô phỏng Cấu tạo Nguyên tử Bohr & Bảng 20 nguyên tố (Chuẩn Vàng KHTN 7, 100vh Zero-Scroll, âm thanh Web Audio, phát âm IUPAC).
  - `ai-tro-ly-giao-vien/`: Trợ lý AI sư phạm soạn đề trắc nghiệm 4 mức độ & ý tưởng bài dạy (hỗ trợ cả Offline thông minh và kết nối Gemini Pro).
  - `tien-ich-lop-hoc/`: Vòng xoay gọi tên ngẫu nhiên & chia nhóm học tập tự động.
- `api/gemini-proxy.js`: Serverless Function cho Vercel (bảo mật khóa Gemini API Key).
