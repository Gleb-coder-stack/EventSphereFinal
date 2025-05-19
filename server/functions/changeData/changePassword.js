const roleModelMap = require('../../const/roles')
const bcrypt = require('bcrypt')
const ApiError = require("../../errors/ApiError");
const {validateUserPassword} = require("../validations/validityPassword");


module.exports = async function (user, oldPassword, newPassword) {
    const modelName = roleModelMap[user.role];
    if (!modelName) {
        throw ApiError.badRequest('Ошибка при поиске пользователя')
    }console.log('sendToValidity')
    const { error } = validateUserPassword(newPassword);

    if(error){
        throw ApiError.badRequest({errors: error.details.map((err) => err.message)}) ;
    }

    try{
        const findUser = await modelName.findByPk(user.id);
        if (!findUser) {
            throw ApiError.badRequest('Пользователь не найден')
        }
        const checkOldPassword = await bcrypt.compare(oldPassword, findUser.password)
        if (!checkOldPassword) {
            throw ApiError.badRequest('Введен неверный пароль')
        }
        const checkNewPassword = await bcrypt.compare(newPassword, findUser.password)
        if (checkNewPassword) {
            throw ApiError.badRequest('Новый пароль совпадает со старым')
        }
        const intSali = Number(process.env.COUNT_SALT)
        const newHashedPassword = await bcrypt.hash(newPassword, intSali);
        await findUser.update({password: newHashedPassword});
        return ({message: 'Пароль успешно обновлен'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}