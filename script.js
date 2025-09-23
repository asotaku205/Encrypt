
/*
============================
HƯỚNG DẪN THỰC HÀNH MÃ HOÁ AN TOÀN THÔNG TIN
============================

File này dành cho việc học và thực hành các thuật toán mã hoá phổ biến.
Bạn sẽ tự viết mã cho từng thuật toán theo các bước hướng dẫn bên dưới.

1. Mã hoá Caesar (Đối xứng)
----------------------------
* Lý thuyết: Caesar Cipher là phương pháp dịch chuyển từng ký tự trong chuỗi theo một số bước (key).
* Bài tập:
  - Viết hàm mã hoá caesarCipherEncrypt(text, key)
  - Viết hàm giải mã caesarCipherDecrypt(text, key)
  - Gợi ý: Sử dụng mã ASCII và phép cộng/trừ với key.

2. Mã hoá Vigenère (Đối xứng)
----------------------------
* Lý thuyết: Vigenère Cipher sử dụng một từ khoá để mã hoá từng ký tự theo chu kỳ.
* Bài tập:
  - Viết hàm vigenereEncrypt(text, keyword)
  - Viết hàm vigenereDecrypt(text, keyword)
  - Gợi ý: Lặp qua từng ký tự, cộng/trừ với ký tự tương ứng trong keyword.

3. Mã hoá Playfair (Đối xứng)
----------------------------
* Lý thuyết: Playfair Cipher sử dụng bảng 5x5 để mã hoá cặp ký tự.
* Bài tập:
  - Viết hàm playfairEncrypt(text, keyword)
  - Viết hàm playfairDecrypt(text, keyword)
  - Gợi ý: Tạo bảng 5x5, xử lý cặp ký tự theo quy tắc Playfair.

4. Mã hoá Rail Fence (Đối xứng)
----------------------------
* Lý thuyết: Rail Fence Cipher sắp xếp ký tự theo dạng ziczac với số hàng là key.
* Bài tập:
  - Viết hàm railFenceEncrypt(text, key)
  - Viết hàm railFenceDecrypt(text, key)
  - Gợi ý: Tạo mảng 2 chiều, điền ký tự theo ziczac.

5. Hàm băm (Hash)
----------------------------
* Lý thuyết: Hàm băm chuyển dữ liệu thành chuỗi cố định, không thể đảo ngược.
* Bài tập:
  - Tìm hiểu về SHA-256, MD5.
  - Viết hàm hashText(text) sử dụng thư viện có sẵn hoặc tự cài đặt thuật toán đơn giản.

6. Mã hoá bất đối xứng (RSA)
----------------------------
* Lý thuyết: RSA sử dụng cặp khoá công khai và bí mật để mã hoá và giải mã.
* Bài tập:
  - Tìm hiểu về số nguyên tố, phép nhân modulo.
  - Viết hàm tạo khoá RSA, mã hoá và giải mã một số nhỏ.

----------------------------
Hãy tự viết từng hàm theo hướng dẫn, kiểm tra kết quả và ghi chú lại các bước thực hiện.
Nếu cần gợi ý hoặc kiểm tra đáp án, hãy hỏi Copilot!
*/