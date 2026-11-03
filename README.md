# JOBBOARD – NỀN TẢNG TÌM KIẾM VIỆC LÀM

## 1. Thông tin sinh viên

- **Họ và tên:** Phạm Đức Cường
- **Mã sinh viên:** 6651071007
- **Môn học:** Web Design
- **Đề tài:** Job Board – Nền tảng tuyển dụng và tìm kiếm việc làm

## 2. Thông tin tính toán đề tài

| Ký hiệu | Giá trị | Ý nghĩa |
|---|---:|---|
| S | 33 | Tổng các chữ số MSSV |
| D | 3 | Đề tài Job Board |
| F | 7 | Ba tính năng bắt buộc |
| C | 1 | Màu Emerald `#059669` |

## 3. Giới thiệu dự án

JobBoard là website hỗ trợ người dùng tìm kiếm và quản lý thông tin tuyển dụng. Website cung cấp giao diện trực quan, dễ sử dụng, tương thích với nhiều kích thước màn hình.

Dự án được xây dựng bằng React, TypeScript và Vite, kết hợp Tailwind CSS để thiết kế giao diện.

## 4. Các tính năng chính

1. **Tìm kiếm và lọc nâng cao:** Tìm việc theo từ khóa, danh mục và loại hình công việc.
2. **CRUD đầy đủ:** Thêm, xem, chỉnh sửa và xóa công việc. Dữ liệu được lưu trữ bằng LocalStorage.
3. **Modal chi tiết:** Xem nhanh thông tin công việc trong cửa sổ modal, hỗ trợ đóng bằng phím ESC và quản lý focus bàn phím.

Ngoài ra, website có trang danh sách công việc và trang chi tiết riêng cho từng công việc.

## 5. Công nghệ sử dụng

- React 18 – Xây dựng giao diện bằng Hooks.
- TypeScript – Kiểm soát kiểu dữ liệu.
- Vite – Công cụ phát triển và build.
- Tailwind CSS – Thiết kế giao diện responsive.
- React Router DOM v6 – Điều hướng giữa các trang.
- Vitest – Kiểm thử đơn vị.
- ESLint – Kiểm tra chất lượng mã nguồn.
- LocalStorage – Lưu trữ dữ liệu trên trình duyệt.

## 6. Cấu trúc thư mục

```text
6651071007_LAB2/
├── public/
├── reports/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── JobCard.tsx
│   │   ├── JobDetailModal.tsx
│   │   └── JobForm.tsx
│   ├── data/
│   │   ├── data.json
│   │   └── jobs.ts
│   ├── pages/
│   │   ├── JobsPage.tsx
│   │   └── JobDetailPage.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── utils.ts
│   └── utils.test.ts
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 7. Hướng dẫn cài đặt và chạy dự án

### Yêu cầu

- Node.js
- npm
- Git

### Bước 1: Clone repository

```bash
git clone https://github.com/DucCuongPham/6651071007_LAB2.git
```

### Bước 2: Di chuyển vào thư mục dự án

```bash
cd 6651071007_LAB2
```

### Bước 3: Cài đặt thư viện

```bash
npm install
```

### Bước 4: Chạy website

```bash
npm run dev
```

Mở địa chỉ được hiển thị trong Terminal, thường là `http://localhost:5173`.

### Bước 5: Kiểm tra chất lượng

```bash
npx tsc --noEmit
npx eslint .
npm run test -- --run
npm run build
```

## 8. Đường dẫn dự án

- **GitHub:** https://github.com/DucCuongPham/6651071007_LAB2
- **Website Production:** https://6651071007-lab-2.vercel.app/

## 9. Kiểm thử và triển khai

Dự án sử dụng Vitest để kiểm thử các hàm tiện ích, ESLint để kiểm tra mã nguồn và TypeScript để kiểm tra kiểu dữ liệu.

Website được triển khai trên Vercel và có thể truy cập trực tuyến thông qua đường dẫn Production ở trên.

## 10. Ghi chú

Dữ liệu công việc được lưu trên LocalStorage của trình duyệt. Vì vậy, dữ liệu CRUD được lưu cục bộ trên từng trình duyệt và thiết bị, không đồng bộ giữa các thiết bị khác nhau.