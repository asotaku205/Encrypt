/*
================================================================================
TRIỂN KHAI ĐẦY ĐỦ CÁC THUẬT TOÁN MÃ HÓA AN TOÀN THÔNG TIN
================================================================================
File: cryptography.js
Tác giả: AI Assistant
Mục đích: Triển khai đầy đủ 3 nhóm thuật toán mã hóa cơ bản
*/

// ================================================================================
// NHÓM 1: MÃ HÓA ĐỐI XỨNG (SYMMETRIC CRYPTOGRAPHY)
// ================================================================================

/**
 * Caesar Cipher - Thuật toán dịch chuyển đơn giản
 * @param {string} text - Văn bản cần xử lý
 * @param {number} shift - Số bước dịch chuyển
 * @param {boolean} encrypt - true: mã hóa, false: giải mã
 * @returns {string} Kết quả sau khi xử lý
 */
function caesarCipher(text, shift, encrypt = true) {
    // Nếu giải mã, ta cần dịch chuyển ngược lại
    if (!encrypt) {
        shift = -shift;
    }
    
    let result = '';
    
    // Duyệt qua từng ký tự trong chuỗi văn bản
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        // Kiểm tra xem ký tự có phải là chữ cái không
        if (/[a-zA-Z]/.test(char)) {
            // Xác định ký tự viết hoa hay thường
            const isUpperCase = char === char.toUpperCase();
            
            // Chuyển về chữ hoa để tính toán dễ hơn
            const upperChar = char.toUpperCase();
            const charPosition = upperChar.charCodeAt(0) - 65; // A=0, B=1, C=2...
            
            // Áp dụng công thức dịch chuyển Caesar
            // + 26 để đảm bảo kết quả luôn dương
            let shiftedPosition = (charPosition + shift + 26) % 26;
            
            // Chuyển vị trí về ký tự
            const newChar = String.fromCharCode(shiftedPosition + 65);
            
            // Giữ nguyên định dạng hoa/thường ban đầu
            if (isUpperCase) {
                result += newChar;
            } else {
                result += newChar.toLowerCase();
            }
        } else {
            // Không phải chữ cái thì giữ nguyên (dấu cách, số, ký tự đặc biệt)
            result += char;
        }
    }
    
    return result;
}

/**
 * Vigenère Cipher - Thuật toán khóa chu kỳ
 * @param {string} text - Văn bản cần xử lý
 * @param {string} keyword - Từ khóa
 * @param {boolean} encrypt - true: mã hóa, false: giải mã
 * @returns {string} Kết quả sau khi xử lý
 */
function vigenereCipher(text, keyword, encrypt = true) {
    if (!keyword) return text;
    
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (/[a-zA-Z]/.test(char)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toUpperCase().charCodeAt(0);
            const keyChar = keyword[keyIndex % keyword.length].toUpperCase();
            const keyShift = keyChar.charCodeAt(0) - 65;
            
            let shifted;
            if (encrypt) {
                shifted = ((charCode - 65 + keyShift) % 26);
            } else {
                shifted = ((charCode - 65 - keyShift + 26) % 26);
            }
            
            const newChar = String.fromCharCode(shifted + 65);
            result += isUpperCase ? newChar : newChar.toLowerCase();
            keyIndex++;
        } else {
            result += char;
        }
    }
    
    return result;
}

/**
 * Playfair Cipher - Thuật toán ma trận 5x5
 * @param {string} text - Văn bản cần xử lý
 * @param {string} key - Khóa
 * @param {boolean} encrypt - true: mã hóa, false: giải mã
 * @returns {string} Kết quả sau khi xử lý
 */
function playfairCipher(text, key, encrypt = true) {
    // Tạo ma trận 5x5 từ khóa
    function createMatrix(key) {
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // J được thay thế bằng I
        const matrix = [];
        const used = new Set();
        let keyStr = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
        
        // Thêm khóa vào ma trận
        for (let char of keyStr) {
            if (!used.has(char)) {
                matrix.push(char);
                used.add(char);
            }
        }
        
        // Thêm các ký tự còn lại
        for (let char of alphabet) {
            if (!used.has(char)) {
                matrix.push(char);
                used.add(char);
            }
        }
        
        // Chuyển thành ma trận 5x5
        const grid = [];
        for (let i = 0; i < 5; i++) {
            grid[i] = matrix.slice(i * 5, (i + 1) * 5);
        }
        
        return grid;
    }
    
    // Tìm vị trí của ký tự trong ma trận
    function findPosition(matrix, char) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (matrix[i][j] === char) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }
    
    // Chuẩn bị văn bản
    function prepareText(text, encrypt) {
        text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
        
        if (encrypt) {
            // Thêm X giữa các cặp ký tự giống nhau
            let prepared = '';
            for (let i = 0; i < text.length; i += 2) {
                prepared += text[i];
                if (i + 1 < text.length) {
                    if (text[i] === text[i + 1]) {
                        prepared += 'X';
                        i--;
                    } else {
                        prepared += text[i + 1];
                    }
                } else {
                    prepared += 'X';
                }
            }
            return prepared;
        } else {
            return text;
        }
    }
    
    const matrix = createMatrix(key);
    const preparedText = prepareText(text, encrypt);
    let result = '';
    
    // Xử lý từng cặp ký tự
    for (let i = 0; i < preparedText.length; i += 2) {
        const char1 = preparedText[i];
        const char2 = preparedText[i + 1] || 'X';
        
        const [row1, col1] = findPosition(matrix, char1);
        const [row2, col2] = findPosition(matrix, char2);
        
        if (row1 === row2) {
            // Cùng hàng
            if (encrypt) {
                result += matrix[row1][(col1 + 1) % 5];
                result += matrix[row2][(col2 + 1) % 5];
            } else {
                result += matrix[row1][(col1 + 4) % 5];
                result += matrix[row2][(col2 + 4) % 5];
            }
        } else if (col1 === col2) {
            // Cùng cột
            if (encrypt) {
                result += matrix[(row1 + 1) % 5][col1];
                result += matrix[(row2 + 1) % 5][col2];
            } else {
                result += matrix[(row1 + 4) % 5][col1];
                result += matrix[(row2 + 4) % 5][col2];
            }
        } else {
            // Tạo hình chữ nhật
            result += matrix[row1][col2];
            result += matrix[row2][col1];
        }
    }
    
    return result;
}

/**
 * Rail Fence Cipher - Thuật toán sắp xếp zigzag
 * @param {string} text - Văn bản cần xử lý
 * @param {number} rails - Số hàng
 * @param {boolean} encrypt - true: mã hóa, false: giải mã
 * @returns {string} Kết quả sau khi xử lý
 */
function railFenceCipher(text, rails, encrypt = true) {
    if (rails <= 1) return text;
    
    if (encrypt) {
        const fence = Array(rails).fill(null).map(() => []);
        let rail = 0;
        let direction = 1;
        
        for (let char of text) {
            fence[rail].push(char);
            rail += direction;
            
            if (rail === rails - 1 || rail === 0) {
                direction = -direction;
            }
        }
        
        return fence.map(row => row.join('')).join('');
    } else {
        // Giải mã
        const fence = Array(rails).fill(null).map(() => Array(text.length).fill(''));
        const railLengths = Array(rails).fill(0);
        
        // Tính độ dài mỗi rail
        let rail = 0;
        let direction = 1;
        
        for (let i = 0; i < text.length; i++) {
            railLengths[rail]++;
            rail += direction;
            
            if (rail === rails - 1 || rail === 0) {
                direction = -direction;
            }
        }
        
        // Điền ký tự vào fence
        let index = 0;
        for (let i = 0; i < rails; i++) {
            for (let j = 0; j < railLengths[i]; j++) {
                fence[i].push(text[index++]);
            }
        }
        
        // Đọc theo zigzag
        let result = '';
        rail = 0;
        direction = 1;
        const railIndices = Array(rails).fill(0);
        
        for (let i = 0; i < text.length; i++) {
            result += fence[rail][railIndices[rail]++];
            rail += direction;
            
            if (rail === rails - 1 || rail === 0) {
                direction = -direction;
            }
        }
        
        return result;
    }
}

/**
 * Mô phỏng AES đơn giản (chỉ để minh họa)
 * @param {string} text - Văn bản cần xử lý
 * @param {string} key - Khóa
 * @param {boolean} encrypt - true: mã hóa, false: giải mã
 * @returns {string} Kết quả sau khi xử lý
 */
function simpleAES(text, key, encrypt = true) {
    // Đây là mô phỏng đơn giản, không phải AES thực sự
    const keySum = key.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    return text.split('').map((char, index) => {
        const charCode = char.charCodeAt(0);
        const keyByte = (keySum + index) % 256;
        
        if (encrypt) {
            return String.fromCharCode((charCode + keyByte) % 256);
        } else {
            return String.fromCharCode((charCode - keyByte + 256) % 256);
        }
    }).join('');
}

// ================================================================================
// NHÓM 2: MÃ HÓA BẤT ĐỐI XỨNG (ASYMMETRIC CRYPTOGRAPHY)
// ================================================================================

/**
 * Kiểm tra số nguyên tố (Miller-Rabin test đơn giản)
 * @param {number} n - Số cần kiểm tra
 * @returns {boolean} true nếu là số nguyên tố
 */
function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

/**
 * Tính ước chung lớn nhất (Thuật toán Euclidean)
 * @param {number} a - Số thứ nhất
 * @param {number} b - Số thứ hai
 * @returns {number} Ước chung lớn nhất
 */
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

/**
 * Tính lũy thừa modulo hiệu quả
 * @param {number} base - Cơ số
 * @param {number} exp - Số mũ
 * @param {number} mod - Modulo
 * @returns {number} (base^exp) % mod
 */
function modPow(base, exp, mod) {
    let result = 1;
    base = base % mod;
    
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    
    return result;
}

/**
 * Thuật toán Extended Euclidean
 * @param {number} a - Số thứ nhất
 * @param {number} b - Số thứ hai
 * @returns {object} {gcd, x, y} sao cho ax + by = gcd(a,b)
 */
function extendedGcd(a, b) {
    if (a === 0) {
        return { gcd: b, x: 0, y: 1 };
    }
    
    const result = extendedGcd(b % a, a);
    const x = result.y - Math.floor(b / a) * result.x;
    const y = result.x;
    
    return { gcd: result.gcd, x: x, y: y };
}

/**
 * Tính nghịch đảo modulo
 * @param {number} a - Số cần tìm nghịch đảo
 * @param {number} m - Modulo
 * @returns {number} Nghịch đảo của a mod m
 */
function modInverse(a, m) {
    const result = extendedGcd(a, m);
    if (result.gcd !== 1) {
        throw new Error('Modular inverse does not exist');
    }
    return (result.x % m + m) % m;
}

/**
 * Tạo số nguyên tố ngẫu nhiên trong khoảng
 * @param {number} min - Giá trị tối thiểu
 * @param {number} max - Giá trị tối đa
 * @returns {number} Số nguyên tố ngẫu nhiên
 */
function generateRandomPrime(min, max) {
    for (let attempts = 0; attempts < 1000; attempts++) {
        const candidate = Math.floor(Math.random() * (max - min + 1)) + min;
        if (isPrime(candidate)) {
            return candidate;
        }
    }
    throw new Error('Could not generate prime number');
}

/**
 * Tạo cặp khóa RSA đơn giản (chỉ để minh họa)
 * @param {number} bitLength - Độ dài bit (đơn giản hóa)
 * @returns {object} Cặp khóa RSA {publicKey, privateKey}
 */
function generateRSAKeys(bitLength = 8) {
    // Tạo hai số nguyên tố nhỏ (chỉ để demo)
    const min = Math.pow(2, bitLength - 1);
    const max = Math.pow(2, bitLength) - 1;
    
    const p = generateRandomPrime(min, max);
    let q;
    do {
        q = generateRandomPrime(min, max);
    } while (q === p);
    
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    
    // Chọn e (thường là 65537, nhưng ở đây dùng số nhỏ hơn)
    let e = 3;
    while (gcd(e, phi) !== 1) {
        e += 2;
    }
    
    // Tính d
    const d = modInverse(e, phi);
    
    return {
        publicKey: { n, e },
        privateKey: { n, d },
        p, q, phi // Chỉ để debug
    };
}

/**
 * Mã hóa RSA
 * @param {string} message - Thông điệp
 * @param {object} publicKey - Khóa công khai {n, e}
 * @returns {string} Ciphertext
 */
function rsaEncrypt(message, publicKey) {
    const { n, e } = publicKey;
    const encrypted = [];
    
    for (let char of message) {
        const m = char.charCodeAt(0);
        if (m >= n) {
            throw new Error('Message too large for key size');
        }
        const c = modPow(m, e, n);
        encrypted.push(c);
    }
    
    return encrypted.join(',');
}

/**
 * Giải mã RSA
 * @param {string} ciphertext - Ciphertext
 * @param {object} privateKey - Khóa bí mật {n, d}
 * @returns {string} Thông điệp gốc
 */
function rsaDecrypt(ciphertext, privateKey) {
    const { n, d } = privateKey;
    const encrypted = ciphertext.split(',').map(Number);
    let decrypted = '';
    
    for (let c of encrypted) {
        const m = modPow(c, d, n);
        decrypted += String.fromCharCode(m);
    }
    
    return decrypted;
}

/**
 * Tạo chữ ký số RSA đơn giản
 * @param {string} message - Thông điệp cần ký
 * @param {object} privateKey - Khóa bí mật
 * @returns {string} Chữ ký số
 */
function rsaSign(message, privateKey) {
    // Đơn giản hóa: hash bằng cách tính tổng mã ASCII
    const hash = message.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % privateKey.n;
    const signature = modPow(hash, privateKey.d, privateKey.n);
    return signature.toString();
}

/**
 * Xác minh chữ ký số RSA
 * @param {string} message - Thông điệp gốc
 * @param {string} signature - Chữ ký số
 * @param {object} publicKey - Khóa công khai
 * @returns {boolean} true nếu chữ ký hợp lệ
 */
function rsaVerify(message, signature, publicKey) {
    const hash = message.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % publicKey.n;
    const decryptedHash = modPow(parseInt(signature), publicKey.e, publicKey.n);
    return hash === decryptedHash;
}

/**
 * Diffie-Hellman Key Exchange đơn giản
 * @param {number} p - Số nguyên tố
 * @param {number} g - Generator
 * @returns {object} Thông tin cần thiết cho trao đổi khóa
 */
function diffieHellmanDemo(p = 23, g = 5) {
    // Alice tạo khóa riêng
    const alicePrivate = Math.floor(Math.random() * (p - 2)) + 1;
    const alicePublic = modPow(g, alicePrivate, p);
    
    // Bob tạo khóa riêng
    const bobPrivate = Math.floor(Math.random() * (p - 2)) + 1;
    const bobPublic = modPow(g, bobPrivate, p);
    
    // Tính shared secret
    const aliceShared = modPow(bobPublic, alicePrivate, p);
    const bobShared = modPow(alicePublic, bobPrivate, p);
    
    return {
        p, g,
        alice: { private: alicePrivate, public: alicePublic, shared: aliceShared },
        bob: { private: bobPrivate, public: bobPublic, shared: bobShared },
        success: aliceShared === bobShared
    };
}

// ================================================================================
// NHÓM 3: HÀM BĂM MỘT CHIỀU (HASH FUNCTIONS)
// ================================================================================

/**
 * Hàm băm djb2 đơn giản
 * @param {string} text - Văn bản cần băm
 * @returns {string} Hash hex
 */
function simpleHash(text) {
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) + hash) + text.charCodeAt(i);
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
}

/**
 * SHA-256 sử dụng Web Crypto API
 * @param {string} text - Văn bản cần băm
 * @returns {Promise<string>} Hash hex
 */
async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * SHA-512 sử dụng Web Crypto API
 * @param {string} text - Văn bản cần băm
 * @returns {Promise<string>} Hash hex
 */
async function sha512(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * HMAC sử dụng Web Crypto API
 * @param {string} message - Thông điệp
 * @param {string} key - Khóa bí mật
 * @param {string} algorithm - Thuật toán hash ('SHA-256', 'SHA-512')
 * @returns {Promise<string>} HMAC hex
 */
async function hmac(message, key, algorithm = 'SHA-256') {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const messageData = encoder.encode(message);
    
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: algorithm },
        false,
        ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const hashArray = Array.from(new Uint8Array(signature));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Mô phỏng bcrypt đơn giản (chỉ để minh họa)
 * @param {string} password - Mật khẩu
 * @param {string} salt - Salt (tùy chọn)
 * @param {number} rounds - Số vòng lặp
 * @returns {string} Hash password
 */
function hashPassword(password, salt = null, rounds = 10) {
    if (!salt) {
        salt = Math.random().toString(36).substring(2, 15);
    }
    
    let hash = password + salt;
    for (let i = 0; i < Math.pow(2, rounds); i++) {
        hash = simpleHash(hash + i);
    }
    
    return `$${rounds}$${salt}$${hash}`;
}

/**
 * Xác minh mật khẩu với hash
 * @param {string} password - Mật khẩu cần kiểm tra
 * @param {string} hash - Hash đã lưu
 * @returns {boolean} true nếu mật khẩu đúng
 */
function verifyPassword(password, hash) {
    const parts = hash.split('$');
    if (parts.length !== 4) return false;
    
    const rounds = parseInt(parts[1]);
    const salt = parts[2];
    const expectedHash = parts[3];
    
    const computedHash = hashPassword(password, salt, rounds);
    return computedHash === hash;
}

// ================================================================================
// HYBRID CRYPTOGRAPHY - KẾT HỢP CÁC THUẬT TOÁN
// ================================================================================

/**
 * Demo Hybrid Cryptography
 * @param {string} message - Thông điệp cần mã hóa
 * @param {object} rsaKeys - Cặp khóa RSA
 * @returns {object} Kết quả hybrid encryption
 */
function hybridEncryptionDemo(message, rsaKeys) {
    // 1. Tạo khóa đối xứng ngẫu nhiên
    const symmetricKey = Math.random().toString(36).substring(2, 15);
    
    // 2. Mã hóa thông điệp bằng khóa đối xứng (dùng Vigenère)
    const encryptedMessage = vigenereCipher(message, symmetricKey, true);
    
    // 3. Mã hóa khóa đối xứng bằng RSA
    const encryptedKey = rsaEncrypt(symmetricKey, rsaKeys.publicKey);
    
    // 4. Tạo hash để kiểm tra tính toàn vẹn
    const messageHash = simpleHash(message);
    
    // 5. Ký hash bằng private key để xác thực
    const signature = rsaSign(message, rsaKeys.privateKey);
    
    return {
        encryptedMessage,
        encryptedKey,
        messageHash,
        signature,
        method: 'Hybrid: RSA + Vigenère + Hash + Digital Signature'
    };
}

/**
 * Demo Hybrid Decryption
 * @param {object} hybridData - Dữ liệu đã mã hóa hybrid
 * @param {object} rsaKeys - Cặp khóa RSA
 * @returns {object} Kết quả giải mã
 */
function hybridDecryptionDemo(hybridData, rsaKeys) {
    try {
        // 1. Giải mã khóa đối xứng bằng RSA private key
        const symmetricKey = rsaDecrypt(hybridData.encryptedKey, rsaKeys.privateKey);
        
        // 2. Giải mã thông điệp bằng khóa đối xứng
        const decryptedMessage = vigenereCipher(hybridData.encryptedMessage, symmetricKey, false);
        
        // 3. Kiểm tra tính toàn vẹn
        const computedHash = simpleHash(decryptedMessage);
        const integrityCheck = computedHash === hybridData.messageHash;
        
        // 4. Xác minh chữ ký
        const signatureValid = rsaVerify(decryptedMessage, hybridData.signature, rsaKeys.publicKey);
        
        return {
            decryptedMessage,
            integrityCheck,
            signatureValid,
            success: integrityCheck && signatureValid,
            symmetricKey
        };
    } catch (error) {
        return {
            error: error.message,
            success: false
        };
    }
}

// ================================================================================
// XUẤT CÁC HÀM ĐỂ SỬ DỤNG
// ================================================================================

// Gán các hàm vào window object để có thể truy cập từ HTML
if (typeof window !== 'undefined') {
    // Symmetric Cryptography
    window.caesarCipher = caesarCipher;
    window.vigenereCipher = vigenereCipher;
    window.playfairCipher = playfairCipher;
    window.railFenceCipher = railFenceCipher;
    window.simpleAES = simpleAES;
    
    // Asymmetric Cryptography
    window.generateRSAKeys = generateRSAKeys;
    window.rsaEncrypt = rsaEncrypt;
    window.rsaDecrypt = rsaDecrypt;
    window.rsaSign = rsaSign;
    window.rsaVerify = rsaVerify;
    window.diffieHellmanDemo = diffieHellmanDemo;
    
    // Hash Functions
    window.simpleHash = simpleHash;
    window.sha256 = sha256;
    window.sha512 = sha512;
    window.hmac = hmac;
    window.hashPassword = hashPassword;
    window.verifyPassword = verifyPassword;
    
    // Hybrid Cryptography
    window.hybridEncryptionDemo = hybridEncryptionDemo;
    window.hybridDecryptionDemo = hybridDecryptionDemo;
    
    // Utility functions
    window.isPrime = isPrime;
    window.gcd = gcd;
    window.modPow = modPow;
}

console.log('✅ Cryptography.js loaded successfully!');
console.log('📚 Available algorithms:');
console.log('🔒 Symmetric: Caesar, Vigenère, Playfair, Rail Fence, AES Demo');
console.log('🗝️ Asymmetric: RSA, Diffie-Hellman, Digital Signature');
console.log('🎯 Hash: SHA-256, SHA-512, HMAC, Password Hash');
console.log('🔄 Hybrid: Combined encryption system');