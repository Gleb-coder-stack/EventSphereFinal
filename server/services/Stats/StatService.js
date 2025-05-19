const { Event, Organizer, Favourites, RecallToEvent} = require('../../models')
const ApiError = require("../../errors/ApiError");

const getCountFavourites = async (idEvent) => {
    return await Favourites.count({where: {idEvent}})
}

const getCountViewsEvent = async (idEvent) => {
    const event = await Event.findByPk(idEvent)
    return event.countViews
}

const getCountRecallEvent = async (idEvent) => {
    return await RecallToEvent.count({where: {idEvent}})
}



class StatService {
    static async getEventStats(req){
        const {id:idEvent} = req.params;
        const countFavourites = await getCountFavourites(idEvent);
        const countViews = await getCountViewsEvent(idEvent);
        const countRecalls = await getCountRecallEvent(idEvent);

        return {favourites: countFavourites, views: countViews, count: countRecalls};
    }
    static async viewEvent(req){
        const {id:idEvent} = req.params
        const event = await Event.findByPk(idEvent);
        if (!event) {
            throw ApiError.badRequest('Мероприятие не найдено');
        }
        await event.increment('countViews');
    }

    static async viewOrganizerProfile(req){
        const {id:idOrganizer} = req.params
        const organizer = await Organizer.findByPk(idOrganizer);
        if (!organizer) {
            throw ApiError.badRequest('Орагнизатор не найдено');
        }

        await organizer.increment('countViews');
    }
}

module.exports = StatService