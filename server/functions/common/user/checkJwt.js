const ApiError = require( "../../../errors/ApiError");

module.exports = async function (id, versionJwt, nameModel){
    try{
       const findUser = await nameModel.findByPk(id);

       if(!findUser){

           return false
       }
       const result = findUser.versionJwt === versionJwt;
       return result;
    }catch(err){
        throw ApiError.internal(err.message);
    }
}