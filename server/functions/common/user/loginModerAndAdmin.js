const ApiError = require("../../../errors/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const generateJwt = require("../../generateJwt");


module.exports = async function (login, password, nameModel){
    const findUser = await nameModel.findOne({where: {login:login}});
    if(!findUser){
        throw ApiError.badRequest('Пользователь не найден')
    }
    let checkPassword = await bcrypt.compare(password, findUser.password)
    if(!checkPassword){
        throw ApiError.badRequest('Введен неверный пароль')
    }
    const versionJwt = uuid.v4()
    const token = generateJwt(findUser.id, findUser.role, versionJwt)
    await findUser.update({versionJwt: versionJwt})
    return ({token: token})
}