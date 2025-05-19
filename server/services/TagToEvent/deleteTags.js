const checkEvent = require("../../functions/common/fields/checkRecord");
const ApiError = require("../../errors/ApiError");
const {Event, TagForEvent} = require("../../models");

module.exports = async function(idEvent){
    try{
        const resultCheckEvent = await checkEvent(idEvent, Event);
        if(!resultCheckEvent){
            throw ApiError.badRequest('Событие не найдено')
        }
        await TagForEvent.destroy({where: {idEvent}});
        return ({message: 'Теги события удалены'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}