const ApiError = require("../../../errors/ApiError");
module.exports = async function (nameModel) {
    try{
        const data = await nameModel.findAll()
        return data
    }catch(err){
        throw ApiError.internal(err.message)
    }
}