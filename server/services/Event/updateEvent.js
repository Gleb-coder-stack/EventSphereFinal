const ApiError = require("../../errors/ApiError");
const {Event} = require("../../models");
const addTags = require("../TagToEvent/addTags");
const deleteTags = require("../TagToEvent/deleteTags");
const updateMedias = require("../EventMedia/updateMedias");

module.exports = async function(idEvent, newData, user){
    const {id: idOrganizer} = user
    try{
        const findEvent = await Event.findByPk(idEvent);
        if(!findEvent){
            throw ApiError.badRequest('Событие не найдено');
        }
        if(findEvent.idOrganizer !== idOrganizer){
            throw ApiError.forbidden('Нельзя обновлять чужие мероприятия')
        }

        if(newData.files){
            await updateMedias(idEvent, newData.files);
        }
        return ({message: 'Событие обновлено'});
    }catch(err){
        throw ApiError.internal(err.message)
    }
}