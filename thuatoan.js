// ===========================================
// CAESAR CIPHER IMPLEMENTATION
// ===========================================
class CaesarCipher {
    static encrypt(text, shift) {
        const steps = [];
        let result = '';
        shift = parseInt(shift) || 0;
        
        steps.push(`Bước 1: Chuyển đổi shift = ${shift} về dạng chuẩn (0-25)`);
        shift = ((shift % 26) + 26) % 26;
        steps.push(`Shift chuẩn hóa: ${shift}`);
        
        steps.push(`Bước 2: Xử lý từng ký tự:`);
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charCode = char.charCodeAt(0);
            
            if (charCode >= 65 && charCode <= 90) { // A-Z
                const shifted = ((charCode - 65 + shift) % 26) + 65;
                const newChar = String.fromCharCode(shifted);
                result += newChar;
                steps.push(`  '${char}' (${charCode}) → '${newChar}' (${shifted})`);
            } else if (charCode >= 97 && charCode <= 122) { // a-z
                const shifted = ((charCode - 97 + shift) % 26) + 97;
                const newChar = String.fromCharCode(shifted);
                result += newChar;
                steps.push(`  '${char}' (${charCode}) → '${newChar}' (${shifted})`);
            } else {
                result += char;
                steps.push(`  '${char}' → '${char}' (không thay đổi)`);
            }
        }
        
        return { result, steps };
    }
    
    static decrypt(text, shift) {
        return this.encrypt(text, -shift);
    }
}

// ===========================================
// VIGENÈRE CIPHER IMPLEMENTATION
// ===========================================
class VigenereCipher {
    static encrypt(text, key) {
        const steps = [];
        let result = '';
        key = key.toUpperCase().replace(/[^A-Z]/g, '');
        
        if (!key) {
            return { result: 'Lỗi: Khóa không hợp lệ', steps: ['Khóa phải chứa ít nhất một chữ cái'] };
        }
        
        steps.push(`Bước 1: Chuẩn hóa khóa: "${key}"`);
        steps.push(`Bước 2: Mở rộng khóa theo độ dài văn bản:`);
        
        let keyIndex = 0;
        let extendedKey = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (/[A-Za-z]/.test(char)) {
                extendedKey += key[keyIndex % key.length];
                keyIndex++;
            } else {
                extendedKey += ' ';
            }
        }
        
        steps.push(`Khóa mở rộng: "${extendedKey}"`);
        steps.push(`Bước 3: Mã hóa từng ký tự:`);
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charCode = char.charCodeAt(0);
            
            if (charCode >= 65 && charCode <= 90) { // A-Z
                const keyChar = extendedKey[i];
                const shift = keyChar.charCodeAt(0) - 65;
                const shifted = ((charCode - 65 + shift) % 26) + 65;
                const newChar = String.fromCharCode(shifted);
                result += newChar;
                steps.push(`  '${char}' + '${keyChar}'(${shift}) → '${newChar}'`);
            } else if (charCode >= 97 && charCode <= 122) { // a-z
                const keyChar = extendedKey[i];
                const shift = keyChar.charCodeAt(0) - 65;
                const shifted = ((charCode - 97 + shift) % 26) + 97;
                const newChar = String.fromCharCode(shifted);
                result += newChar;
                steps.push(`  '${char}' + '${keyChar}'(${shift}) → '${newChar}'`);
            } else {
                result += char;
                steps.push(`  '${char}' → '${char}' (không thay đổi)`);
            }
        }
        
        return { result, steps };
    }
    
    static decrypt(text, key) {
        const steps = [];
        let result = '';
        key = key.toUpperCase().replace(/[^A-Z]/g, '');
        
        if (!key) {
            return { result: 'Lỗi: Khóa không hợp lệ', steps: ['Khóa phải chứa ít nhất một chữ cái'] };
        }
        
        steps.push(`Bước 1: Chuẩn hóa khóa: "${key}"`);
        steps.push(`Bước 2: Giải mã bằng cách trừ khóa:`);
        
        let keyIndex = 0;
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charCode = char.charCodeAt(0);
            
            if (charCode >= 65 && charCode <= 90) { // A-Z
                const keyChar = key[keyIndex % key.length];
                const shift = keyChar.charCodeAt(0) - 65;
                const shifted = ((charCode - 65 - shift + 26) % 26) + 65;
                const newChar = String.fromCharCode(shifted);
                result += newChar;
                steps.push(`  '${char}' - '${keyChar}'(${shift}) → '${newChar}'`);
                keyIndex++;
            } else if (charCode >= 97 && charCode <= 122) { // a-z
                const keyChar = key[keyIndex % key.length];
                const shift = keyChar.charCodeAt(0) - 65;
                const shifted = ((charCode - 97 - shift + 26) % 26) + 97;
                const newChar = String.fromCharCode(shifted);
                result += newChar;
                steps.push(`  '${char}' - '${keyChar}'(${shift}) → '${newChar}'`);
                keyIndex++;
            } else {
                result += char;
                steps.push(`  '${char}' → '${char}' (không thay đổi)`);
            }
        }
        
        return { result, steps };
    }
}

// ===========================================
// PLAYFAIR CIPHER IMPLEMENTATION
// ===========================================
class PlayfairCipher {
    static createMatrix(key) {
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // J được thay bằng I
        const matrix = [];
        const used = new Set();
        let matrixStr = '';
        
        // Thêm key vào matrix
        for (let char of key.toUpperCase()) {
            if (char === 'J') char = 'I';
            if (/[A-Z]/.test(char) && !used.has(char)) {
                matrixStr += char;
                used.add(char);
            }
        }
        
        // Thêm các chữ cái còn lại
        for (let char of alphabet) {
            if (!used.has(char)) {
                matrixStr += char;
            }
        }
        
        // Tạo ma trận 5x5
        for (let i = 0; i < 5; i++) {
            matrix[i] = [];
            for (let j = 0; j < 5; j++) {
                matrix[i][j] = matrixStr[i * 5 + j];
            }
        }
        
        return matrix;
    }
    
    static findPosition(matrix, char) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (matrix[i][j] === char) {
                    return { row: i, col: j };
                }
            }
        }
        return null;
    }
    
    static prepareText(text) {
        text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        let prepared = '';
        
        for (let i = 0; i < text.length; i += 2) {
            let first = text[i];
            let second = text[i + 1] || 'X';
            
            if (first === second) {
                prepared += first + 'X';
                i--; // Xử lý lại ký tự thứ hai
            } else {
                prepared += first + second;
            }
        }
        
        if (prepared.length % 2 !== 0) {
            prepared += 'X';
        }
        
        return prepared;
    }
    
    static encrypt(text, key) {
        const steps = [];
        const matrix = this.createMatrix(key);
        const prepared = this.prepareText(text);
        let result = '';
        
        steps.push(`Bước 1: Tạo ma trận Playfair với khóa "${key}":`);
        steps.push(`Ma trận 5x5:`);
        for (let row of matrix) {
            steps.push(`  ${row.join(' ')}`);
        }
        
        steps.push(`Bước 2: Chuẩn bị văn bản: "${text}" → "${prepared}"`);
        steps.push(`Bước 3: Mã hóa từng cặp ký tự:`);
        
        for (let i = 0; i < prepared.length; i += 2) {
            const first = prepared[i];
            const second = prepared[i + 1];
            
            const pos1 = this.findPosition(matrix, first);
            const pos2 = this.findPosition(matrix, second);
            
            let newFirst, newSecond;
            
            if (pos1.row === pos2.row) {
                // Cùng hàng: dịch phải
                newFirst = matrix[pos1.row][(pos1.col + 1) % 5];
                newSecond = matrix[pos2.row][(pos2.col + 1) % 5];
                steps.push(`  "${first}${second}" (cùng hàng) → "${newFirst}${newSecond}"`);
            } else if (pos1.col === pos2.col) {
                // Cùng cột: dịch xuống
                newFirst = matrix[(pos1.row + 1) % 5][pos1.col];
                newSecond = matrix[(pos2.row + 1) % 5][pos2.col];
                steps.push(`  "${first}${second}" (cùng cột) → "${newFirst}${newSecond}"`);
            } else {
                // Tạo hình chữ nhật
                newFirst = matrix[pos1.row][pos2.col];
                newSecond = matrix[pos2.row][pos1.col];
                steps.push(`  "${first}${second}" (hình chữ nhật) → "${newFirst}${newSecond}"`);
            }
            
            result += newFirst + newSecond;
        }
        
        return { result, steps };
    }
    
    static decrypt(text, key) {
        const steps = [];
        const matrix = this.createMatrix(key);
        let result = '';
        
        steps.push(`Bước 1: Tạo ma trận Playfair với khóa "${key}":`);
        steps.push(`Ma trận 5x5:`);
        for (let row of matrix) {
            steps.push(`  ${row.join(' ')}`);
        }
        
        steps.push(`Bước 2: Giải mã từng cặp ký tự:`);
        
        for (let i = 0; i < text.length; i += 2) {
            const first = text[i];
            const second = text[i + 1];
            
            const pos1 = this.findPosition(matrix, first);
            const pos2 = this.findPosition(matrix, second);
            
            if (!pos1 || !pos2) continue;
            
            let newFirst, newSecond;
            
            if (pos1.row === pos2.row) {
                // Cùng hàng: dịch trái
                newFirst = matrix[pos1.row][(pos1.col - 1 + 5) % 5];
                newSecond = matrix[pos2.row][(pos2.col - 1 + 5) % 5];
                steps.push(`  "${first}${second}" (cùng hàng) → "${newFirst}${newSecond}"`);
            } else if (pos1.col === pos2.col) {
                // Cùng cột: dịch lên
                newFirst = matrix[(pos1.row - 1 + 5) % 5][pos1.col];
                newSecond = matrix[(pos2.row - 1 + 5) % 5][pos2.col];
                steps.push(`  "${first}${second}" (cùng cột) → "${newFirst}${newSecond}"`);
            } else {
                // Tạo hình chữ nhật
                newFirst = matrix[pos1.row][pos2.col];
                newSecond = matrix[pos2.row][pos1.col];
                steps.push(`  "${first}${second}" (hình chữ nhật) → "${newFirst}${newSecond}"`);
            }
            
            result += newFirst + newSecond;
        }
        
        return { result, steps };
    }
}

// ===========================================
// RAIL FENCE CIPHER IMPLEMENTATION
// ===========================================
class RailFenceCipher {
    static encrypt(text, rails) {
        const steps = [];
        rails = parseInt(rails) || 3;
        
        if (rails < 2) {
            return { result: 'Lỗi: Số rail phải >= 2', steps: ['Số rail không hợp lệ'] };
        }
        
        const fence = Array(rails).fill().map(() => []);
        let rail = 0;
        let direction = 1;
        
        steps.push(`Bước 1: Tạo ${rails} rail (hàng rào)`);
        steps.push(`Bước 2: Đặt từng ký tự vào rail theo hình zíc zắc:`);
        
        for (let i = 0; i < text.length; i++) {
            fence[rail].push(text[i]);
            steps.push(`  Ký tự '${text[i]}' → Rail ${rail + 1}`);
            
            if (rail === 0) {
                direction = 1;
            } else if (rail === rails - 1) {
                direction = -1;
            }
            
            rail += direction;
        }
        
        steps.push(`Bước 3: Đọc theo từng rail:`);
        let result = '';
        for (let i = 0; i < rails; i++) {
            const railContent = fence[i].join('');
            result += railContent;
            steps.push(`  Rail ${i + 1}: "${railContent}"`);
        }
        
        return { result, steps };
    }
    
    static decrypt(text, rails) {
        const steps = [];
        rails = parseInt(rails) || 3;
        
        if (rails < 2) {
            return { result: 'Lỗi: Số rail phải >= 2', steps: ['Số rail không hợp lệ'] };
        }
        
        // Tạo pattern để xác định vị trí
        const pattern = Array(rails).fill().map(() => []);
        let rail = 0;
        let direction = 1;
        
        steps.push(`Bước 1: Tạo pattern để xác định vị trí trong ${rails} rail`);
        
        for (let i = 0; i < text.length; i++) {
            pattern[rail].push(i);
            
            if (rail === 0) {
                direction = 1;
            } else if (rail === rails - 1) {
                direction = -1;
            }
            
            rail += direction;
        }
        
        steps.push(`Bước 2: Phân phối ký tự vào từng rail:`);
        
        // Điền ký tự vào các rail
        const fence = Array(rails).fill().map(() => []);
        let index = 0;
        
        for (let i = 0; i < rails; i++) {
            const railLength = pattern[i].length;
            const railContent = text.substr(index, railLength);
            fence[i] = railContent.split('');
            steps.push(`  Rail ${i + 1}: "${railContent}"`);
            index += railLength;
        }
        
        steps.push(`Bước 3: Đọc theo pattern zíc zắc:`);
        
        // Đọc theo pattern
        const result = Array(text.length);
        for (let i = 0; i < rails; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                result[pattern[i][j]] = fence[i][j];
            }
        }
        
        return { result: result.join(''), steps };
    }
}