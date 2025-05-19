const Joi = require('joi');

const passwordSchema = Joi.string()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
        "string.min": "Пароль должен содержать минимум 8 символов",
        "string.max": "Пароль не должен превышать 32 символа",
        "string.pattern.base":
            "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один спецсимвол",
        "any.required": "Пароль обязателен",
    });

const validateUserPassword = (data) => {
    return passwordSchema.validate(data, { abortEarly: false });
};

module.exports = {
    passwordSchema,
    validateUserPassword,
};
