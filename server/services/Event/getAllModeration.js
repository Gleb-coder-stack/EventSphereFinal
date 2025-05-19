const ApiError = require("../../errors/ApiError");
const {Event, Tag, TagForEvent, EventsMedia, Organizer} = require("../../models");
module.exports = async function(){
    try{
        return await Event.findAll({where: {status: 'moderation'}, include: [
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['id', 'Name'],
                    through: { model: TagForEvent }
                },
                {
                    model: EventsMedia,
                    as: 'medias',
                    limit: 1,
                    separate: true,
                    order: [['createdAt', 'ASC']],
                    required: false
                },
                {
                    model: Organizer,
                    as: 'organizer',
                    attributes: ['id', 'name'],
                }
            ],})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}