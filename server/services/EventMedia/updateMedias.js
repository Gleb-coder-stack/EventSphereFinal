const {EventsMedia, Event} = require("../../models");
const checkEvent = require("../../functions/common/fields/checkRecord");
const ApiError = require("../../errors/ApiError");
const addMedias = require("./addMedias");
const path = require('path');
const fs = require('fs');

module.exports = async function(idEvent, newFiles){
    try{
        const findEvent = await checkEvent(idEvent, Event);
        if(!findEvent){
            throw ApiError.badRequest("Событие не найдено");
        }
        const oldMedias = await EventsMedia.findAll({where:{idEvent:idEvent}});
        for (const media of oldMedias) {
            const filePath = path.resolve(__dirname, '..', 'static', media.nameMedia); // имя хранится как mediaForEvents/файл.jpg
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // удаление
            }
        }
        await EventsMedia.destroy({where:{idEvent:idEvent}});
        await addMedias(idEvent, newFiles);
        return ({message: 'Старые файлы удалены'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}