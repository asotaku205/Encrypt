// Biến toàn cục
let currentAlgorithm = 'caesar';

// Cập nhật giao diện theo thuật toán
function updateAlgorithm() {
    currentAlgorithm = document.getElementById('algorithm').value;
    const inputKey = document.getElementById('input-key');
    
    // Reset kết quả
    document.getElementById('encrypt-result').textContent = 'Chưa có kết quả';
    document.getElementById('decrypt-result').textContent = 'Chưa có kết quả';
    document.getElementById('algorithm-steps').innerHTML = '';
    
    // Cập nhật placeholder và giá trị mặc định cho khóa
    switch (currentAlgorithm) {
        case 'caesar':
            inputKey.placeholder = 'Ví dụ: 3';
            inputKey.type = 'number';
            inputKey.value = '3';
            break;
        case 'vigenere':
            inputKey.placeholder = 'Ví dụ: KEY';
            inputKey.type = 'text';
            inputKey.value = 'KEY';
            break;
        case 'playfair':
            inputKey.placeholder = 'Ví dụ: MONARCHY';
            inputKey.type = 'text';
            inputKey.value = 'MONARCHY';
            break;
        case 'rail-fence':
            inputKey.placeholder = 'Ví dụ: 3';
            inputKey.type = 'number';
            inputKey.value = '3';
            break;
    }
}

// Thực hiện mã hóa
function performEncryption() {
    const text = document.getElementById('input-text').value;
    const key = document.getElementById('input-key').value;
    const resultDiv = document.getElementById('encrypt-result');
    const stepsDiv = document.getElementById('algorithm-steps');
    
    if (!text.trim()) {
        resultDiv.textContent = 'Vui lòng nhập văn bản!';
        resultDiv.style.color = 'red';
        return;
    }
    
    if (!key.trim()) {
        resultDiv.textContent = 'Vui lòng nhập khóa!';
        resultDiv.style.color = 'red';
        return;
    }
    
    let result;
    
    try {
        switch (currentAlgorithm) {
            case 'caesar':
                result = CaesarCipher.encrypt(text, key);
                break;
            case 'vigenere':
                result = VigenereCipher.encrypt(text, key);
                break;
            case 'playfair':
                result = PlayfairCipher.encrypt(text, key);
                break;
            case 'rail-fence':
                result = RailFenceCipher.encrypt(text, key);
                break;
        }
        
        resultDiv.innerHTML = `<span class="step-highlight">${result.result}</span>`;
        resultDiv.style.color = '#2c3e50';
        
        // Reset kết quả giải mã
        document.getElementById('decrypt-result').textContent = 'Chưa có kết quả';
        
        // Hiển thị các bước
        stepsDiv.innerHTML = `
            <h4>Chi tiết quá trình Mã hóa (${currentAlgorithm.toUpperCase()}):</h4>
            <ol>
                ${result.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
        
    } catch (error) {
        resultDiv.textContent = 'Có lỗi xảy ra: ' + error.message;
        resultDiv.style.color = 'red';
    }
}

// Thực hiện giải mã
function performDecryption() {
    const text = document.getElementById('input-text').value;
    const key = document.getElementById('input-key').value;
    const resultDiv = document.getElementById('decrypt-result');
    const stepsDiv = document.getElementById('algorithm-steps');
    
    if (!text.trim()) {
        resultDiv.textContent = 'Vui lòng nhập văn bản!';
        resultDiv.style.color = 'red';
        return;
    }
    
    if (!key.trim()) {
        resultDiv.textContent = 'Vui lòng nhập khóa!';
        resultDiv.style.color = 'red';
        return;
    }
    
    let result;
    
    try {
        switch (currentAlgorithm) {
            case 'caesar':
                result = CaesarCipher.decrypt(text, key);
                break;
            case 'vigenere':
                result = VigenereCipher.decrypt(text, key);
                break;
            case 'playfair':
                result = PlayfairCipher.decrypt(text, key);
                break;
            case 'rail-fence':
                result = RailFenceCipher.decrypt(text, key);
                break;
        }
        
        resultDiv.innerHTML = `<span class="step-highlight">${result.result}</span>`;
        resultDiv.style.color = '#2c3e50';
        
        // Reset kết quả mã hóa
        document.getElementById('encrypt-result').textContent = 'Chưa có kết quả';
        
        // Hiển thị các bước
        stepsDiv.innerHTML = `
            <h4>Chi tiết quá trình Giải mã (${currentAlgorithm.toUpperCase()}):</h4>
            <ol>
                ${result.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
        
    } catch (error) {
        resultDiv.textContent = 'Có lỗi xảy ra: ' + error.message;
        resultDiv.style.color = 'red';
    }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    updateAlgorithm();
    
    // Xử lý phím Enter
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performEncryption(); // Mặc định là mã hóa khi nhấn Enter
            }
        });
    });
});