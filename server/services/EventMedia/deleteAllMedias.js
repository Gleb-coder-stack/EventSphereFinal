const ApiError = require("../../errors/ApiError");
const {EventsMedia} = require("../../models");
const path = require("path");
const fs = require("fs");
module.exports = async function(idEvent){
    try{
        const medias = await EventsMedia.findAll({where:{idEvent:idEvent}});
        if(medias.length === 0){
            return ({message: 'Медиа не найдены'})
        }
        for (const media of medias) {
            const filePath = path.resolve(__dirname, '..', 'static', media.nameMedia); // имя хранится как mediaForEvents/файл.jpg
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // удаление
            }
        }
        await EventsMedia.destroy({where:{idEvent:idEvent}});
        return ({message: 'Все медиафайлы удалены'});
    }catch(err){
        throw ApiError.internal(err.message);
    }
}