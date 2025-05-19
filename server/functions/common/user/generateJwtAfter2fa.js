const ApiError = require( "../../../errors/ApiError");
const uuid = require("uuid");
const generateJwt = require("../../generateJwt");

module.exports = async function (email, nameModel){
    try{
        console.log(nameModel, email);
        const user = await nameModel.findOne({where: {email: email}});
        if(!user){
            throw  ApiError.badRequest('Пользователь не найден');
        }
        const versionJwt = uuid.v4()
        const token = generateJwt(user.id, user.role, versionJwt)
        await user.update({versionJwt: versionJwt})
        return ({token: token})
    }catch(e){
        throw  ApiError.internal(e.message);
    }
}