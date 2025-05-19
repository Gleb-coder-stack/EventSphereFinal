const ApiError = require("../../../errors/ApiError");
const { badRequest } = require("../../../errors/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const generateJwt = require("../../generateJwt");


module.exports = async function (email, password, nameModel, field){
    try{
        const findUser = await nameModel.findOne({where: {[field]:email}});
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
    }catch(err){
        throw ApiError.internal(err.message);
    }
}