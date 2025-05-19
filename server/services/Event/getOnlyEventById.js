const {Event} = require('../../models')
const ApiError = require("../../errors/ApiError");

module.exports = async function(id){
    const event = await Event.findByPk(id)
    if(!event){
        throw ApiError.badRequest('Мероприятие не найдено')
    }
    return event
}