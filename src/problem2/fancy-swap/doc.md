Giải thích giải pháp

Công nghệ sử dụng:

Vite: Công cụ build nhanh, tận dụng điểm thưởng.
React + TypeScript: Đảm bảo code an toàn kiểu, dễ bảo trì.
Tailwind CSS: Tạo giao diện đẹp, responsive, và hiện đại mà không cần viết CSS riêng.
CDN: Sử dụng Tailwind CSS qua CDN cho đơn giản (có thể tích hợp PostCSS nếu cần).


Chức năng chính:

Chọn token: 1 dropdown để chọn token nguồn và đích, hiển thị hình ảnh SVG (giả lập bằng placeholder).
Nhập số lượng: Input số để nhập số lượng token nguồn, tự động tính số lượng USDT đích dựa trên tỷ giá trong mock data https://interview.switcheo.com/prices.json.
Hiển thị số dư: Hiển thị số dư ví giả lập cho token nguồn.
Tính toán USD: Hiển thị giá trị USD của số tiền nhận được.
Submit giả lập: Nút "Swap" mô phỏng gọi API với loading indicator (1 giây).


Kiểm tra đầu vào:

Kiểm tra số lượng không hợp lệ (âm, không phải số).
Kiểm tra số dư không đủ.
Kiểm tra giá không khả dụng.
Hiển thị thông báo lỗi rõ ràng bằng text màu đỏ.


Tính trực quan và thẩm mỹ:

Giao diện sử dụng Tailwind CSS với thiết kế sạch, hiện đại, và responsive.
Các thành phần được bố trí rõ ràng: dropdown, input, thông báo lỗi, và nút submit.
Hình ảnh token (giả lập) hiển thị bên cạnh dropdown để tăng tính trực quan.
Loading indicator khi submit để mô phỏng tương tác backend.


Mô phỏng backend:

Sử dụng setTimeout để giả lập gọi API với độ trễ 1 giây.
Hiển thị trạng thái loading trên nút submit.


Dữ liệu giả lập:

Token: ETH, BTC, USDT với hình ảnh placeholder.
Giá: ETH = $2600, BTC = $60000, USDT = $1.
Số dư ví: ETH = 5, BTC = 0.1, USDT = 1000.