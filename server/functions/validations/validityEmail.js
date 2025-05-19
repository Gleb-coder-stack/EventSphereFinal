const Joi = require('joi');

const emailSchema = Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
        "string.email": "Некорректный email",
        "any.required": "Email обязателен",
    });

const validateUserEmail = (data) => {
    return emailSchema.validate(data, { abortEarly: false });
};

module.exports = {
    emailSchema,
    validateUserEmail,
};
