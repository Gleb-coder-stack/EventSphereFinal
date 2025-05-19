
const roleModelMap = require('../../const/roles')
const ApiError = require("../../errors/ApiError");
const sendMail = require("../../email/sendingMails");
const auth = require("../../email/TwoFactorAuth");


module.exports = async function changePasswordController(req){
    const {email, role} = req.body;
    if(!email){
        return ApiError.badRequest('Введите данные')
    }
    const modelName = roleModelMap[role]
    const user = await modelName.findOne({where: {email}})
    if(!user){
        throw ApiError.badRequest('Пользователь с таким email не найден')
    }
    return {message: 'Укажите новый пароль'};
}