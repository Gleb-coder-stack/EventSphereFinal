const ApiError = require("../../../errors/ApiError");
module.exports = async function (email, nameModel) {
    try{
        const findResult = await nameModel.findOne({ where: { email } })
        return !findResult;

    }catch(err){
        throw ApiError.internal(err.message)
    }
}