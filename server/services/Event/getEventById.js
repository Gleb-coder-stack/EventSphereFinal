const ApiError = require("../../errors/ApiError");
const {Event, sequelize, EventsMedia, Organizer, Tag, TagForEvent} = require("../../models");
const {where} = require("sequelize");


module.exports = async function(idEvent){
    try{
        const findEventById = await Event.findOne({where: {id: idEvent}, include: [{
            model: EventsMedia,
                as: "medias"
            },
                {
                    model: Organizer,
                    as: "organizer",
                    attributes: ['id', 'name'],
                },
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['id', 'Name', 'isSystem'],
                    through: { model: TagForEvent }
                },
            ]});
        if(!findEventById){
            throw ApiError.badRequest('Событие не найдено');
        }
        return findEventById;
    }catch(err){
        throw ApiError.internal(err.message);
    }
}