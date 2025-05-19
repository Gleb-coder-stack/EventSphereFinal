const Joi = require('joi');
const { emailSchema } = require('./validityEmail');
const { passwordSchema } = require('./validityPassword');

const validationSchema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
});

const validateUserData = (data) => {
    return validationSchema.validate(data, { abortEarly: false });
};

module.exports = validateUserData;
