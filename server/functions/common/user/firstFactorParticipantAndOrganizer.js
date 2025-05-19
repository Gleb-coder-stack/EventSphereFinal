const ApiError = require("../../../errors/ApiError");
const { badRequest } = require("../../../errors/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const generateJwt = require("../../generateJwt");


module.exports = async function (email, password, nameModel){
    const findUser = await nameModel.findOne({where: {email:email}});
    if(!findUser){
        throw ApiError.badRequest('Пользователь не найден')
    }
    let checkPassword = await bcrypt.compare(password, findUser.password)
    if(!checkPassword){
        throw ApiError.badRequest('Введен неверный пароль')
    }
    return
}
