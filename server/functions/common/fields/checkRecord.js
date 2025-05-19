const ApiError = require("../../../errors/ApiError");

module.exports = async function(id, nameModel){
    try{
        const result  = await nameModel.findByPk(id)
        return !!result;
    }catch(err){
        throw ApiError.internal(err.message)
    }
}