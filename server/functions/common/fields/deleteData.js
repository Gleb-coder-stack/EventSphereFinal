const ApiError = require("../../../errors/ApiError");
const err = require("../../../errors/ApiError");
module.exports = async function(id, nameModel){
    try{
        const filed = await nameModel.findByPk(id)
        if(!filed){
            throw ApiError.badRequest('Запись не найдена')
        }
        await filed.destroy();
        return ({message: 'Запись удалена'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}