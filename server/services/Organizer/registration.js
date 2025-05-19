const ApiError = require("../../errors/ApiError");
const { Organizer} = require("../../models");
const hashPassword = require('../../functions/hashPassword')
const checkUnique = require("../../functions/common/user/checkUniqueField");


const nameModel = Organizer

module.exports = async function(name, email, password) {
    const findEmail = await checkUnique('email', email, nameModel);
    if(findEmail){
        throw ApiError.badRequest('Организатор с таким email уже существует')
    }
    const findNickName = await checkUnique('name', name, nameModel);
    if(findNickName){
        throw ApiError.badRequest('Организатор с таким ником уже есть')
    }
    const resultHash = await hashPassword(password)
    await Organizer.create({name, email, password: resultHash})
    return ({message: 'Код для подтверждения почты отправлен', email: email});
}