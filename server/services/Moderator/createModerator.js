const {Moderator} = require("../../models");
const ApiError = require("../../errors/ApiError");
const checkLogin = require("../../functions/common/user/checkUniqueField");
const hashPassword = require("../../functions/hashPassword");


const nameModel = Moderator
module.exports = async function createModerator(login, password) {
    try{
        const resultCheck = await checkLogin('login', login, nameModel);
        if(resultCheck){
            throw ApiError.badRequest('Модератор с таким логином уже существует')
        }
        const resultHash = await hashPassword(password)
        await Moderator.create({login, password: resultHash.hashPassword})
        return ({message: 'Модератор создан'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}