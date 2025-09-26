/*
================================================================================
SCRIPT ĐIỀU KHIỂN GIAO DIỆN CHO ỨNG DỤNG MÃ HÓA
================================================================================
File: script.js
Mục đích: Xử lý sự kiện và tương tác với giao diện HTML
*/

// Biến lưu trữ cặp khóa RSA hiện tại
let currentRSAKeys = null;

/**
 * Cập nhật giao diện khi thay đổi thuật toán
 */
function updateAlgorithm() {
    const algorithm = document.getElementById('algorithm').value;
    const keyInput = document.getElementById('input-key');
    const keyLabel = keyInput.previousElementSibling;
    const encryptLabel = document.getElementById('encrypt-label');
    const decryptLabel = document.getElementById('decrypt-label');
    const hashResultGroup = document.getElementById('hash-result-group');
    const keypairResultGroup = document.getElementById('keypair-result-group');
    
    // Reset display của các result groups
    hashResultGroup.style.display = 'none';
    keypairResultGroup.style.display = 'none';
    
    // Cấu hình theo từng thuật toán
    switch(algorithm) {
        case 'caesar':
            keyLabel.textContent = 'Shift (số bước dịch):';
            keyInput.placeholder = 'Nhập số bước dịch (VD: 3)';
            keyInput.value = '3';
            encryptLabel.textContent = 'Kết quả Mã hóa Caesar:';
            decryptLabel.textContent = 'Kết quả Giải mã Caesar:';
            break;
            
        case 'vigenere':
            keyLabel.textContent = 'Keyword (từ khóa):';
            keyInput.placeholder = 'Nhập từ khóa (VD: SECRET)';
            keyInput.value = 'SECRET';
            encryptLabel.textContent = 'Kết quả Mã hóa Vigenère:';
            decryptLabel.textContent = 'Kết quả Giải mã Vigenère:';
            break;
            
        case 'playfair':
            keyLabel.textContent = 'Key (khóa Playfair):';
            keyInput.placeholder = 'Nhập khóa (VD: MONARCHY)';
            keyInput.value = 'MONARCHY';
            encryptLabel.textContent = 'Kết quả Mã hóa Playfair:';
            decryptLabel.textContent = 'Kết quả Giải mã Playfair:';
            break;
            
        case 'rail-fence':
            keyLabel.textContent = 'Rails (số hàng):';
            keyInput.placeholder = 'Nhập số hàng (VD: 3)';
            keyInput.value = '3';
            encryptLabel.textContent = 'Kết quả Mã hóa Rail Fence:';
            decryptLabel.textContent = 'Kết quả Giải mã Rail Fence:';
            break;
            
        case 'aes-demo':
            keyLabel.textContent = 'Key (khóa AES demo):';
            keyInput.placeholder = 'Nhập khóa bí mật';
            keyInput.value = 'MySecretKey123';
            encryptLabel.textContent = 'Kết quả Mã hóa AES Demo:';
            decryptLabel.textContent = 'Kết quả Giải mã AES Demo:';
            break;
            
        case 'rsa':
            keyLabel.textContent = 'Key Size (bit length):';
            keyInput.placeholder = 'Kích thước khóa (VD: 8)';
            keyInput.value = '8';
            encryptLabel.textContent = 'Kết quả Mã hóa RSA:';
            decryptLabel.textContent = 'Kết quả Giải mã RSA:';
            keypairResultGroup.style.display = 'block';
            break;
            
        case 'diffie-hellman':
            keyLabel.textContent = 'Prime (p):';
            keyInput.placeholder = 'Số nguyên tố (VD: 23)';
            keyInput.value = '23';
            encryptLabel.textContent = 'Alice\'s Shared Key:';
            decryptLabel.textContent = 'Bob\'s Shared Key:';
            keypairResultGroup.style.display = 'block';
            break;
            
        case 'digital-signature':
            keyLabel.textContent = 'Key Size (bit length):';
            keyInput.placeholder = 'Kích thước khóa (VD: 8)';
            keyInput.value = '8';
            encryptLabel.textContent = 'Chữ ký số:';
            decryptLabel.textContent = 'Xác minh chữ ký:';
            keypairResultGroup.style.display = 'block';
            break;
            
        case 'sha256':
        case 'sha512':
            keyLabel.textContent = 'Salt (tùy chọn):';
            keyInput.placeholder = 'Nhập salt (có thể để trống)';
            keyInput.value = '';
            encryptLabel.textContent = `Kết quả Hash ${algorithm.toUpperCase()}:`;
            decryptLabel.style.display = 'none';
            decryptLabel.nextElementSibling.style.display = 'none';
            hashResultGroup.style.display = 'block';
            break;
            
        case 'hmac':
            keyLabel.textContent = 'Secret Key:';
            keyInput.placeholder = 'Nhập khóa bí mật cho HMAC';
            keyInput.value = 'MyHMACSecret';
            encryptLabel.textContent = 'Kết quả HMAC:';
            decryptLabel.style.display = 'none';
            decryptLabel.nextElementSibling.style.display = 'none';
            hashResultGroup.style.display = 'block';
            break;
            
        case 'password-hash':
            keyLabel.textContent = 'Rounds (độ khó):';
            keyInput.placeholder = 'Số rounds (VD: 10)';
            keyInput.value = '10';
            encryptLabel.textContent = 'Password Hash:';
            decryptLabel.textContent = 'Verify Password:';
            break;
            
        case 'hybrid-demo':
            keyLabel.textContent = 'RSA Key Size:';
            keyInput.placeholder = 'Kích thước khóa RSA (VD: 8)';
            keyInput.value = '8';
            encryptLabel.textContent = 'Hybrid Encryption:';
            decryptLabel.textContent = 'Hybrid Decryption:';
            keypairResultGroup.style.display = 'block';
            break;
            
        default:
            keyLabel.textContent = 'Khóa:';
            keyInput.placeholder = 'Nhập khóa...';
            encryptLabel.textContent = 'Kết quả Mã hóa:';
            decryptLabel.textContent = 'Kết quả Giải mã:';
            break;
    }
    
    // Reset hiển thị cho decrypt nếu bị ẩn
    if (['sha256', 'sha512', 'hmac'].indexOf(algorithm) === -1) {
        decryptLabel.style.display = 'block';
        decryptLabel.nextElementSibling.style.display = 'block';
    }
    
    // Clear previous results
    clearResults();
}

/**
 * Xóa kết quả trước đó
 */
function clearResults() {
    document.getElementById('encrypt-result').textContent = 'Chưa có kết quả';
    document.getElementById('decrypt-result').textContent = 'Chưa có kết quả';
    document.getElementById('hash-result').textContent = 'Chưa có kết quả';
    document.getElementById('keypair-result').textContent = 'Chưa có kết quả';
}

/**
 * Thực hiện mã hóa
 */
async function performEncryption() {
    const algorithm = document.getElementById('algorithm').value;
    const text = document.getElementById('input-text').value;
    const key = document.getElementById('input-key').value;
    const resultElement = document.getElementById('encrypt-result');
    const hashResultElement = document.getElementById('hash-result');
    const keypairResultElement = document.getElementById('keypair-result');
    
    if (!text.trim()) {
        resultElement.textContent = '❌ Vui lòng nhập văn bản!';
        return;
    }
    
    try {
        let result = '';
        
        switch(algorithm) {
            case 'caesar':
                const shift = parseInt(key) || 3;
                result = caesarCipher(text, shift, true);
                break;
                
            case 'vigenere':
                if (!key.trim()) {
                    resultElement.textContent = '❌ Vui lòng nhập keyword!';
                    return;
                }
                result = vigenereCipher(text, key, true);
                break;
                
            case 'playfair':
                if (!key.trim()) {
                    resultElement.textContent = '❌ Vui lòng nhập khóa!';
                    return;
                }
                result = playfairCipher(text, key, true);
                break;
                
            case 'rail-fence':
                const rails = parseInt(key) || 3;
                result = railFenceCipher(text, rails, true);
                break;
                
            case 'aes-demo':
                if (!key.trim()) {
                    resultElement.textContent = '❌ Vui lòng nhập khóa!';
                    return;
                }
                result = simpleAES(text, key, true);
                // Chuyển đổi sang hex để hiển thị
                result = Array.from(result).map(char => 
                    char.charCodeAt(0).toString(16).padStart(2, '0')
                ).join(' ');
                break;
                
            case 'rsa':
                const keySize = parseInt(key) || 8;
                try {
                    currentRSAKeys = generateRSAKeys(keySize);
                    result = rsaEncrypt(text, currentRSAKeys.publicKey);
                    keypairResultElement.innerHTML = `
                        <strong>Public Key:</strong> {n: ${currentRSAKeys.publicKey.n}, e: ${currentRSAKeys.publicKey.e}}<br>
                        <strong>Private Key:</strong> {n: ${currentRSAKeys.privateKey.n}, d: ${currentRSAKeys.privateKey.d}}
                    `;
                } catch (error) {
                    result = `❌ Lỗi: ${error.message}`;
                }
                break;
                
            case 'diffie-hellman':
                const p = parseInt(key) || 23;
                const dhResult = diffieHellmanDemo(p, 5);
                result = `Shared Key: ${dhResult.alice.shared}`;
                keypairResultElement.innerHTML = `
                    <strong>Parameters:</strong> p=${dhResult.p}, g=${dhResult.g}<br>
                    <strong>Alice:</strong> private=${dhResult.alice.private}, public=${dhResult.alice.public}<br>
                    <strong>Bob:</strong> private=${dhResult.bob.private}, public=${dhResult.bob.public}<br>
                    <strong>Success:</strong> ${dhResult.success ? '✅' : '❌'}
                `;
                break;
                
            case 'digital-signature':
                const sigKeySize = parseInt(key) || 8;
                try {
                    currentRSAKeys = generateRSAKeys(sigKeySize);
                    const signature = rsaSign(text, currentRSAKeys.privateKey);
                    result = `Signature: ${signature}`;
                    keypairResultElement.innerHTML = `
                        <strong>Keys generated for signing</strong><br>
                        <strong>Public Key:</strong> {n: ${currentRSAKeys.publicKey.n}, e: ${currentRSAKeys.publicKey.e}}
                    `;
                } catch (error) {
                    result = `❌ Lỗi: ${error.message}`;
                }
                break;
                
            case 'sha256':
                result = await sha256(text + (key || ''));
                hashResultElement.textContent = `SHA-256: ${result}`;
                break;
                
            case 'sha512':
                result = await sha512(text + (key || ''));
                hashResultElement.textContent = `SHA-512: ${result}`;
                break;
                
            case 'hmac':
                if (!key.trim()) {
                    resultElement.textContent = '❌ Vui lòng nhập khóa bí mật!';
                    return;
                }
                result = await hmac(text, key);
                hashResultElement.textContent = `HMAC-SHA256: ${result}`;
                break;
                
            case 'password-hash':
                const rounds = parseInt(key) || 10;
                result = hashPassword(text, null, rounds);
                break;
                
            case 'hybrid-demo':
                const hybridKeySize = parseInt(key) || 8;
                try {
                    currentRSAKeys = generateRSAKeys(hybridKeySize);
                    const hybridResult = hybridEncryptionDemo(text, currentRSAKeys);
                    result = JSON.stringify(hybridResult, null, 2);
                    keypairResultElement.innerHTML = `
                        <strong>RSA Keys Generated:</strong><br>
                        <strong>Public Key:</strong> {n: ${currentRSAKeys.publicKey.n}, e: ${currentRSAKeys.publicKey.e}}<br>
                        <strong>Method:</strong> ${hybridResult.method}
                    `;
                } catch (error) {
                    result = `❌ Lỗi: ${error.message}`;
                }
                break;
                
            default:
                result = '❌ Thuật toán không được hỗ trợ';
                break;
        }
        
        if (['sha256', 'sha512', 'hmac'].indexOf(algorithm) === -1) {
            resultElement.textContent = result;
        } else {
            resultElement.textContent = `Hash completed ✅`;
        }
        
    } catch (error) {
        resultElement.textContent = `❌ Lỗi: ${error.message}`;
    }
}

/**
 * Thực hiện giải mã
 */
async function performDecryption() {
    const algorithm = document.getElementById('algorithm').value;
    const text = document.getElementById('input-text').value;
    const key = document.getElementById('input-key').value;
    const resultElement = document.getElementById('decrypt-result');
    
    // Các thuật toán hash không có giải mã
    if (['sha256', 'sha512', 'hmac'].indexOf(algorithm) !== -1) {
        resultElement.textContent = '❌ Hash functions không thể giải mã!';
        return;
    }
    
    if (!text.trim()) {
        resultElement.textContent = '❌ Vui lòng nhập văn bản!';
        return;
    }
    
    try {
        let result = '';
        
        switch(algorithm) {
            case 'caesar':
                const shift = parseInt(key) || 3;
                result = caesarCipher(text, shift, false);
                break;
                
            case 'vigenere':
                if (!key.trim()) {
                    resultElement.textContent = '❌ Vui lòng nhập keyword!';
                    return;
                }
                result = vigenereCipher(text, key, false);
                break;
                
            case 'playfair':
                if (!key.trim()) {
                    resultElement.textContent = '❌ Vui lòng nhập khóa!';
                    return;
                }
                result = playfairCipher(text, key, false);
                break;
                
            case 'rail-fence':
                const rails = parseInt(key) || 3;
                result = railFenceCipher(text, rails, false);
                break;
                
            case 'aes-demo':
                if (!key.trim()) {
                    resultElement.textContent = '❌ Vui lòng nhập khóa!';
                    return;
                }
                // Chuyển hex về chuỗi ký tự
                const hexText = text.replace(/\s/g, '');
                let binaryText = '';
                for (let i = 0; i < hexText.length; i += 2) {
                    const hex = hexText.substr(i, 2);
                    binaryText += String.fromCharCode(parseInt(hex, 16));
                }
                result = simpleAES(binaryText, key, false);
                break;
                
            case 'rsa':
                if (!currentRSAKeys) {
                    resultElement.textContent = '❌ Vui lòng tạo khóa RSA trước!';
                    return;
                }
                result = rsaDecrypt(text, currentRSAKeys.privateKey);
                break;
                
            case 'diffie-hellman':
                result = 'Diffie-Hellman được dùng để trao đổi khóa, không mã hóa trực tiếp';
                break;
                
            case 'digital-signature':
                if (!currentRSAKeys) {
                    resultElement.textContent = '❌ Vui lòng tạo khóa trước!';
                    return;
                }
                // Giả sử text chứa signature cần verify
                const originalMessage = document.getElementById('input-text').value;
                const encryptResult = document.getElementById('encrypt-result').textContent;
                
                if (encryptResult.includes('Signature:')) {
                    const signature = encryptResult.split('Signature: ')[1];
                    const isValid = rsaVerify(originalMessage, signature, currentRSAKeys.publicKey);
                    result = isValid ? '✅ Chữ ký hợp lệ' : '❌ Chữ ký không hợp lệ';
                } else {
                    result = '❌ Vui lòng tạo chữ ký trước!';
                }
                break;
                
            case 'password-hash':
                const hashedPassword = document.getElementById('encrypt-result').textContent;
                if (hashedPassword && hashedPassword !== 'Chưa có kết quả') {
                    const isValid = verifyPassword(text, hashedPassword);
                    result = isValid ? '✅ Mật khẩu đúng' : '❌ Mật khẩu sai';
                } else {
                    result = '❌ Vui lòng hash mật khẩu trước!';
                }
                break;
                
            case 'hybrid-demo':
                if (!currentRSAKeys) {
                    resultElement.textContent = '❌ Vui lòng tạo khóa trước!';
                    return;
                }
                try {
                    const hybridData = JSON.parse(text);
                    const decryptResult = hybridDecryptionDemo(hybridData, currentRSAKeys);
                    if (decryptResult.success) {
                        result = `✅ Giải mã thành công: "${decryptResult.decryptedMessage}"
                        Tính toàn vẹn: ${decryptResult.integrityCheck ? '✅' : '❌'}
                        Chữ ký hợp lệ: ${decryptResult.signatureValid ? '✅' : '❌'}`;
                    } else {
                        result = `❌ Giải mã thất bại: ${decryptResult.error || 'Unknown error'}`;
                    }
                } catch (error) {
                    result = `❌ Dữ liệu hybrid không hợp lệ: ${error.message}`;
                }
                break;
                
            default:
                result = '❌ Thuật toán không được hỗ trợ';
                break;
        }
        
        resultElement.textContent = result;
        
    } catch (error) {
        resultElement.textContent = `❌ Lỗi: ${error.message}`;
    }
}

// Khởi tạo giao diện khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    updateAlgorithm();
    console.log('🎉 Ứng dụng mã hóa đã sẵn sàng!');
    console.log('📖 Các thuật toán có sẵn:');
    console.log('   🔒 Symmetric: Caesar, Vigenère, Playfair, Rail Fence, AES Demo');
    console.log('   🗝️  Asymmetric: RSA, Diffie-Hellman, Digital Signature');
    console.log('   🎯 Hash: SHA-256, SHA-512, HMAC, Password Hash');
    console.log('   🔄 Hybrid: Combined encryption system');
});

// Thêm event listeners cho input để tự động clear results khi thay đổi
document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input-text');
    const inputKey = document.getElementById('input-key');
    
    inputText.addEventListener('input', clearResults);
    inputKey.addEventListener('input', clearResults);
});