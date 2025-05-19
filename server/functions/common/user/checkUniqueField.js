const ApiError = require("../../../errors/ApiError");
module.exports = async function (nameField, data, nameModel) {
    try{
        const findResult = await nameModel.findOne({ where: { [nameField]: data } })
        return !!findResult;
    }catch(err){
        throw ApiError.internal(err.message)
    }
}