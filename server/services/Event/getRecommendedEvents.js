const {ViewingHistory, Event, Favourites, TagForEvent, Organizer} = require("../../models");
const ApiError = require("../../errors/ApiError");
const {Op} = require("sequelize");

const allowStatus = ['active', 'planned'];

module.exports = async function(req){
    const {id} = req.user
    const eventIdsInHistory = await ViewingHistory.findAll({where: {idParticipant: id}, limit: 5, attributes: ['idEvent']})
    const eventIdsInFavourite = await Favourites.findAll({where: {idParticipant: id}, attributes: ['idEvent'], limit: 5})
    const eventIds = [...new Set([
        ...eventIdsInHistory.map(v => v.idEvent),
        ...eventIdsInFavourite.map(f => f.idEvent)
    ])];
    if(eventIds.length === 0){
        throw ApiError.badRequest('Нет рекомендованных мероприятий. Просмотрите их или добавьте в избранное')
    }
    const tagLinks = await TagForEvent.findAll({
        where: { idEvent: { [Op.in]: eventIds } },
        attributes: ['idTag'],
        group: ['idTag']
    });

    const tagIds = tagLinks.map(link => link.idTag);

    if (tagIds.length === 0) {
        return [];
    }

    const similarTagLinks = await TagForEvent.findAll({
        where: {
            idTag: { [Op.in]: tagIds },
            idEvent: { [Op.notIn]: eventIds },
        },
        attributes: ['idEvent'],
        group: ['idEvent']
    });

    return await Event.findAll({
        where: {
            id: {[Op.in]: similarTagLinks.map(link => link.idEvent)},
            status: {[Op.in]: allowStatus},
        }, include: [
            {
                model: Organizer,
                as: 'organizer',
                attributes: ['name'],
            }
        ],
        limit: 10,
    })
}