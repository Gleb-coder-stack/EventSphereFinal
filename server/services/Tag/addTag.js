const ApiError = require("../../errors/ApiError");
const {Tag} = require("../../models");

module.exports = async function(body={}){
    const {Name, ...isSystem} = body;
    if(!Name){
        throw ApiError.badRequest('Заполните имя тега')
    }
    try{
        await Tag.create({Name, ...isSystem});
        return ({message: 'Тег успешно добавлен'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}