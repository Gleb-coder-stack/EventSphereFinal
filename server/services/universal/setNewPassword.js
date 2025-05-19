const roleModelMap = require('../../const/roles')
const ApiError = require("../../errors/ApiError");
const hashPassword = require('../../functions/hashPassword')
const sendingMail = require('../../email/sendingMails');


module.exports = async function(req){
    const {email, role, newPassword} = req.body
    console.log(email, role, newPassword)
    if(!email || !role || !newPassword){
        throw ApiError.badRequest("Укажите нужные даннные");
    }
    const nameModel = roleModelMap[role]
    const user = await nameModel.findOne({where: {email}})
    if(!user){
        throw ApiError.badRequest('Пользователь не найден')
    }
    const resultHash = await hashPassword(newPassword)
    await user.update({password: resultHash})
    await sendingMail.sendMessageOfChangePassword(email)
    return {message: 'Пароль успещно обновлен'}
}