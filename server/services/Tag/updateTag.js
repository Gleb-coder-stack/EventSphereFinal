const ApiError = require("../../errors/ApiError");
const err = require("../../errors/ApiError");
const {Tag} = require("../../models");
module.exports = async function (id, newData={}) {
    try{
        const tag = await Tag.findByPk(id)
        if(!tag){
            throw ApiError.badRequest("Тег не найден")
        }
        await tag.update(newData);
        return ({message: 'Тег обновлен'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}