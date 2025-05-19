const ApiError = require("../../errors/ApiError");
const { Event, Organizer} = require("../../models");
const addTags = require("../TagToEvent/addTags");
const addMedias = require("../../services/EventMedia/addMedias");
const calculateDuration = require("../../functions/calculateDates");

module.exports = async function(newData, user){
    const {name, description, dateStart, dateEnd,  longitude, latitude} = newData.body
    const files = newData.files
    if (!name || !description || !dateStart|| !dateEnd || longitude === undefined || latitude === undefined) {
        throw ApiError.badRequest("Одно или несколько обязательных полей отсутствуют");
    }
    const {id: idOrganizer} = user

    try{
        const duration = calculateDuration(dateStart, dateEnd);
        const organizer = await Organizer.findOne({where: {id: idOrganizer}})
        if(!organizer.isAccredited){
            throw ApiError.forbidden("Только аккредитованные организаторы могут размещать мероприятия");
        }
        const newEvent = await Event.create({name, description, dateStart, duration, dateEnd, longitude, latitude, idOrganizer})
        if(files){
            await addMedias(newEvent.id, files.files);
        }
        if(newData.body.tagIds){
            await addTags(newEvent.id, newData.body.tagIds)
        }

        return ({message: 'Событие создано и отправлено на модерацию'})
    }catch (err) {
        throw ApiError.internal(err.message)
    }
}