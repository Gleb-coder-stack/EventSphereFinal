const ApiError = require("../../errors/ApiError");
const {Moderator} = require("../../models");
module.exports = async function(id, newData){
    try{
        const moderator = await Moderator.findByPk(id)
        if(!moderator){
            throw ApiError.badRequest('Модератор не найден')
        }
        await moderator.update(id, newData)
        return ({message: 'Модератор обновлен'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}