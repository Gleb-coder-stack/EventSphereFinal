

class TwoFactorAuth {
    constructor() {

        this.codes = new Map();
    }


    generateCode(length = 6) {
        const digits = '0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            code += digits[Math.floor(Math.random() * digits.length)];
        }
        return code;
    }

    createCodeForEmail(email, ttlSeconds = 600) {
        const code = this.generateCode();
        const expiresAt = Date.now() + ttlSeconds * 1000;

        this.codes.set(email, { code, expiresAt });

        return code;
    }

    // Проверка кода
    verifyCode(email, code) {
        const data = this.codes.get(email);
        if (!data) return false;
        if (Date.now() > data.expiresAt) {
            this.codes.delete(email);
            return false;
        }

        const isValid = data.code === code;

        // Если проверка успешна — удалить код (одноразовый)
        if (isValid) this.codes.delete(email);

        return isValid;
    }
}

module.exports = new TwoFactorAuth();
