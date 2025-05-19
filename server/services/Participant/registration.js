const ApiError = require("../../errors/ApiError");
const { Participant } = require("../../models");
const hashPassword = require('../../functions/hashPassword')
const checkUnique = require("../../functions/common/user/checkUniqueField");

const nameModel = Participant;
module.exports = async function (nickname, email, password){
    const findEmail = await checkUnique('email', email, nameModel);
    if(findEmail){
        throw ApiError.badRequest('Участник с таким email уже существует')
    }
    const findNickName = await checkUnique('nickname', nickname, nameModel);
    if(findNickName){
        throw ApiError.badRequest('Участник с таким ником уже есть')
    }
    const resultHash = await hashPassword(password)
    await Participant.create({nickname, email, password: resultHash})
    return ({message: 'Код для подтверждения почты отправлен', email: email});
}