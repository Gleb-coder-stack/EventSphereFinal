const ApiError = require( "../../errors/ApiError");

module.exports = async function (id, versionJwt, nameModel){
    try{
       const findUser = await nameModel.findByPk(id);
       if(!findUser){
           return false
       }
       return findUser.versionJwt === versionJwt;
    }catch(err){
        throw ApiError.internal(err.message);
    }
}