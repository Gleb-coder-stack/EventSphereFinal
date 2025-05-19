const roleModelMap = require('../../const/roles')
const ApiError = require("../../errors/ApiError");
const bcrypt = require("bcrypt");
const hashPassword = require('../../functions/hashPassword')

module.exports = async function(req){
    const {id, role} = req.user;
    const modelName = roleModelMap[role];
    const {oldPassword, newPassword} = req.body;
    const user = await modelName.findByPk(id)
    if(!user){
        throw ApiError.badRequest('Пользователь не найден');
    }
    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
    if(!checkOldPassword){
        throw ApiError.badRequest('Старый пароль указан не верно')
    }
    if(oldPassword === newPassword){
        throw ApiError.badRequest('Новый пароль совпадает со старым')
    }
    const newHashedPassword = await hashPassword(newPassword);
    await user.update({password: newHashedPassword})
    return {message: 'Пароль успешно сменен'};
}