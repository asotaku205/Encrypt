
/*
============================
HƯỚNG DẪN THỰC HÀNH MÃ HOÁ AN TOÀN THÔNG TIN - 3 NHÓM CHÍNH
============================

File này dành cho việc học và thực hành 3 nhóm thuật toán mã hoá cơ bản:
1. MÃ HOÁ ĐỐI XỨNG (Symmetric Cryptography)
2. MÃ HOÁ BẤT ĐỐI XỨNG (Asymmetric Cryptography) 
3. HÀM BĂM MỘT CHIỀU (Hash Functions)

================================================================================
NHÓM 1: MÃ HOÁ ĐỐI XỨNG (SYMMETRIC CRYPTOGRAPHY)
================================================================================

🔍 KHÁI NIỆM CHUNG:
Mã hóa đối xứng sử dụng cùng một khóa (secret key) cho cả quá trình mã hóa và giải mã.
Người gửi và người nhận phải chia sẻ khóa bí mật trước khi trao đổi thông tin.

🎯 ĐặC ĐIỂM:
✅ Ưu điểm:
- Tốc độ xử lý nhanh
- Phù hợp với dữ liệu lớn  
- Độ bảo mật cao khi khóa được bảo vệ tốt
- Ít tốn tài nguyên tính toán

❌ Nhược điểm:
- Vấn đề phân phối khóa (Key Distribution Problem)
- Số lượng khóa tăng theo cấp số nhân (n người cần n*(n-1)/2 khóa)
- Không cung cấp tính toàn vẹn và xác thực

�️ CÁC THUẬT TOÁN PHỔ BIẾN:

A. THUẬT TOÁN CỔ ĐIỂN (Classical Ciphers):
   - Caesar Cipher (dịch chuyển đơn giản)
   - Vigenère Cipher (khóa chu kỳ)
   - Playfair Cipher (ma trận 5×5)
   - Rail Fence Cipher (sắp xếp zigzag)

B. THUẬT TOÁN HIỆN ĐẠI (Modern Ciphers):
   - DES (Data Encryption Standard) - 56-bit, đã lỗi thời
   - 3DES (Triple DES) - áp dụng DES 3 lần
   - AES (Advanced Encryption Standard) - chuẩn hiện tại
   - Blowfish, Twofish - thuật toán thay thế
   - ChaCha20, Salsa20 - stream ciphers hiện đại

🧪 BÀI TẬP THỰC HÀNH:

Bước 1: Triển khai Caesar Cipher cơ bản
function symmetricCaesar(text, key, encrypt = true) {
    // TODO: Cài đặt thuật toán Caesar
    // - Xử lý cả mã hóa và giải mã
    // - Hỗ trợ key âm/dương
    // - Xử lý cả chữ hoa/thường
}

Bước 2: Triển khai Vigenère Cipher
function symmetricVigenere(text, keyword, encrypt = true) {
    // TODO: Cài đặt thuật toán Vigenère
    // - Mở rộng keyword theo độ dài text
    // - Áp dụng công thức (char ± keyChar) % 26
}

Bước 3: Mô phỏng AES đơn giản (Educational)
function simpleAES(data, key) {
    // TODO: Tạo mô phỏng đơn giản của AES
    // - SubBytes (thay thế byte)
    // - ShiftRows (dịch chuyển hàng)  
    // - MixColumns (trộn cột)
    // - AddRoundKey (XOR với khóa)
}

Bước 4: Tạo hệ thống quản lý khóa
function keyManagement() {
    // TODO: Tạo hệ thống:
    // - Sinh khóa ngẫu nhiên
    // - Lưu trữ an toàn
    // - Chia sẻ khóa an toàn
}

🔍 KHÁI NIỆM CHUNG:
Mã hóa bất đối xứng sử dụng cặp khóa: khóa công khai (public key) và khóa bí mật (private key).
Những gì được mã hóa bằng khóa này chỉ có thể được giải mã bằng khóa kia.

🎯 ĐẶC ĐIỂM:
✅ Ưu điểm:
- Giải quyết vấn đề phân phối khóa
- Cung cấp tính xác thực và chữ ký số
- Không cần chia sẻ khóa bí mật trước
- Hỗ trợ non-repudiation (chống chối bỏ)

❌ Nhược điểm:
- Tốc độ chậm hơn mã hóa đối xứng rất nhiều
- Yêu cầu tài nguyên tính toán lớn
- Kích thước khóa phải lớn để đảm bảo an toàn
- Dễ bị tấn công nếu triển khai sai

🛠️ CÁC THUẬT TOÁN PHỔ BIẾN:

A. RSA (Rivest-Shamir-Adleman):
   - Dựa trên độ khó của phân tích số nguyên lớn
   - Kích thước khóa: 1024, 2048, 4096 bit
   - Ứng dụng: mã hóa, chữ ký số

B. ECC (Elliptic Curve Cryptography):
   - Dựa trên toán học đường cong elliptic
   - Kích thước khóa nhỏ hơn RSA nhưng cùng độ an toàn
   - Ưu điểm: hiệu quả, ít tốn tài nguyên

C. DSA (Digital Signature Algorithm):
   - Chuyên dùng cho chữ ký số
   - Không dùng để mã hóa dữ liệu

D. Diffie-Hellman:
   - Trao đổi khóa an toàn qua kênh không bảo mật
   - Cơ sở cho nhiều giao thức bảo mật

🧪 BÀI TẬP THỰC HÀNH:

Bước 1: Các hàm toán học cơ bản
function isPrime(n) {
    // TODO: Kiểm tra số nguyên tố (Miller-Rabin test)
}

function gcd(a, b) {
    // TODO: Tính ước chung lớn nhất (Euclidean algorithm)
}

function modPow(base, exp, mod) {
    // TODO: Tính (base^exp) % mod hiệu quả
}

function extendedGcd(a, b) {
    // TODO: Thuật toán Extended Euclidean
    // Trả về {gcd, x, y} sao cho ax + by = gcd(a,b)
}

Bước 2: Tạo khóa RSA
function generateRSAKeys(bitLength = 1024) {
    // TODO: Tạo cặp khóa RSA
    // 1. Tạo 2 số nguyên tố p, q
    // 2. Tính n = p * q
    // 3. Tính φ(n) = (p-1)(q-1)
    // 4. Chọn e (thường 65537)
    // 5. Tính d = e^(-1) mod φ(n)
    // Trả về: {publicKey: {n, e}, privateKey: {n, d}}
}

Bước 3: Mã hóa/Giải mã RSA
function rsaEncrypt(message, publicKey) {
    // TODO: m^e mod n
}

function rsaDecrypt(ciphertext, privateKey) {
    // TODO: c^d mod n
}

Bước 4: Chữ ký số RSA
function rsaSign(message, privateKey) {
    // TODO: Tạo chữ ký số
    // 1. Hash message
    // 2. Ký hash với private key
}

function rsaVerify(message, signature, publicKey) {
    // TODO: Xác minh chữ ký
    // 1. Hash message
    // 2. Giải mã signature với public key
    // 3. So sánh hash
}

================================================================================
NHÓM 3: HÀM BĂM MỘT CHIỀU (HASH FUNCTIONS)
================================================================================

🔍 KHÁI NIỆM CHUNG:
Hàm băm biến đổi dữ liệu đầu vào (có độ dài bất kỳ) thành một chuỗi có độ dài cố định.
Đặc điểm quan trọng: quá trình một chiều, không thể đảo ngược.

🎯 ĐẶC ĐIỂM:
✅ Tính chất cần có:
- Deterministic: cùng input → cùng output
- Fast computation: tính toán nhanh
- Pre-image resistance: khó tìm input từ output  
- Second pre-image resistance: khó tìm input khác có cùng output
- Collision resistance: khó tìm 2 input khác nhau có cùng output
- Avalanche effect: thay đổi nhỏ input → thay đổi lớn output

❌ Các lỗ hổng:
- Hash collision (va chạm băm)
- Length extension attacks
- Rainbow table attacks
- Birthday attacks

🛠️ CÁC THUẬT TOÁN PHỔ BIẾN:

A. THUẬT TOÁN CŨ (Không nên dùng):
   - MD5 (128-bit) - có lỗ hổng collision
   - SHA-1 (160-bit) - không còn an toàn

B. THUẬT TOÁN HIỆN TẠI:
   - SHA-256, SHA-384, SHA-512 (SHA-2 family)
   - SHA-3 (Keccak) - thế hệ mới nhất
   - BLAKE2, BLAKE3 - nhanh và an toàn

C. ỨNG DỤNG ĐẶC BIỆT:
   - bcrypt, scrypt, Argon2 - hash password
   - HMAC - xác thực thông điệp
   - PBKDF2 - tạo khóa từ password

🧪 BÀI TẬP THỰC HÀNH:

Bước 1: Hàm băm đơn giản (Educational)
function simpleHash(text) {
    // TODO: Thuật toán djb2 hash
    // hash = 5381
    // for each char: hash = ((hash << 5) + hash) + charCode
}

Bước 2: Sử dụng Web Crypto API
async function sha256(text) {
    // TODO: 
    // 1. Chuyển text thành ArrayBuffer
    // 2. Dùng crypto.subtle.digest('SHA-256', buffer)
    // 3. Chuyển kết quả thành hex string
}

async function sha512(text) {
    // TODO: Tương tự SHA-256 nhưng dùng 'SHA-512'
}

Bước 3: HMAC (Hash-based Message Authentication Code)
async function hmac(message, key, algorithm = 'SHA-256') {
    // TODO:
    // 1. Import key với crypto.subtle.importKey()
    // 2. Dùng crypto.subtle.sign('HMAC', key, message)
    // 3. Trả về hex string
}

Bước 4: Password Hashing (bcrypt simulation)
function hashPassword(password, salt, rounds = 10) {
    // TODO: Mô phỏng bcrypt
    // 1. Tạo salt ngẫu nhiên nếu chưa có
    // 2. Lặp hash password + salt theo rounds
    // 3. Trả về format: $rounds$salt$hash
}

function verifyPassword(password, hash) {
    // TODO: Xác minh password với hash đã lưu
}

================================================================================
SO SÁNH VÀ ỨNG DỤNG THỰC TẾ
================================================================================

🎯 KHI NÀO DÙNG THUẬT TOÁN NÀO:

MÃ HÓA ĐỐI XỨNG:
✅ Mã hóa dữ liệu lớn (file, database)
✅ Truyền thông real-time  
✅ Khi đã có kênh chia sẻ khóa an toàn
❌ Giao tiếp với người lạ chưa có khóa chung

MÃ HÓA BẤT ĐỐI XỨNG:
✅ Trao đổi khóa ban đầu
✅ Chữ ký số, xác thực
✅ Giao tiếp với người lạ
❌ Mã hóa dữ liệu lớn (quá chậm)

HÀM BĂM:
✅ Lưu trữ password
✅ Kiểm tra tính toàn vẹn dữ liệu
✅ Proof of work (blockchain)
✅ Tạo ID duy nhất
❌ Mã hóa dữ liệu cần giải mã

🎯 HYBRID CRYPTOGRAPHY (Kết hợp):
1. Dùng bất đối xứng để trao đổi khóa đối xứng
2. Dùng đối xứng để mã hóa dữ liệu chính
3. Dùng hash để kiểm tra tính toàn vẹn
4. Dùng chữ ký số để xác thực

VÍ DỤ: HTTPS/TLS
- RSA/ECDH: trao đổi khóa
- AES: mã hóa dữ liệu
- SHA-256: kiểm tra tính toàn vẹn
- RSA/ECDSA: chữ ký chứng chỉ

================================================================================
📚 TÀI LIỆU THAM KHẢO VÀ HƯỚNG DẪN THÊM
================================================================================

SÁCH:
1. "Introduction to Modern Cryptography" - Katz & Lindell
2. "Applied Cryptography" - Bruce Schneier  
3. "Handbook of Applied Cryptography" - Menezes, Oorschot, Vanstone

CHUẨN QUỐC TẾ:
1. NIST Special Publications (SP 800 series)
2. RFC documents (RFC 3447 cho RSA, RFC 6234 cho SHA)
3. FIPS standards

CÔNG CỤ THỰC HÀNH:
1. OpenSSL command line
2. CyberChef (online crypto tools)
3. Cryptool (educational software)

🚨 LƯU Ý AN TOÀN:
- Code trong file này CHỈ dành cho mục đích học tập
- KHÔNG sử dụng trong hệ thống thực tế
- Luôn dùng thư viện mã hóa đã được kiểm định
- Cập nhật kiến thức về các lỗ hổng bảo mật mới
- Hiểu rõ về key management và secure implementation

================================================================================
HẾT HƯỚNG DẪN - CHÚC BẠN HỌC TẬP HIỆU QUẢ!
================================================================================
*/