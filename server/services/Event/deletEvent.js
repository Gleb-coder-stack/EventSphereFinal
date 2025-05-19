const ApiError = require("../../errors/ApiError");
const {Event} = require("../../models");
const deleteMedias = require("../EventMedia/deleteAllMedias");


module.exports = async function (idEvent, user){
    const {id: idOrganizer} = user
    try{
        const findEvent = await Event.findByPk(idEvent);
        if(!findEvent){
            throw ApiError.badRequest('Событие не найдено');
        }
        if(findEvent.idOrganizer !== idOrganizer){
            throw ApiError.forbidden('Нельзя удалить чужое событие');
        }
        await deleteMedias(findEvent.id)
        await findEvent.destroy();
        return ({message: 'Событе удалено'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}