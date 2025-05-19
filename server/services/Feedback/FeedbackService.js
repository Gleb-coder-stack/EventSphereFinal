const {Feedback, Event, RecallToEvent, Organizer, Participant} = require( "../../models");
const ApiError = require( "../../errors/ApiError");
const {Op} = require("sequelize");
const leoProfanity = require('leo-profanity');
leoProfanity.add(leoProfanity.getDictionary('ru'));


const allowRates = [1, 2, 3, 4, 5]

const checkRecallsToEvents = async (idOrganizer, idParticipant) => {
    const organizersEvents = await Event.findAll({where: {idOrganizer}, attributes: ['id']})
    if(organizersEvents.length === 0) {
        return false;
    }
    const eventIds = organizersEvents.map(e => e.id);
    const participantRecall = await RecallToEvent.findOne({where: {
            idParticipant, idEvent: { [Op.in]: eventIds }
        }})
    return !!participantRecall
}

const isMyFeedbacks = async (idFeedback, idParticipant, ...role) => {
    const feedback  = await Feedback.findByPk(idFeedback)
    if(!feedback) {
        throw  ApiError.badRequest('Отзыв не найден');
    }
    if(role && role !== 'participant') {
        return feedback
    }
    if(feedback.idParticipant !== idParticipant) {
        throw ApiError.forbidden('Нельзя изменять чужой отзыв');
    }
    return feedback;
}

const validityRate = (rate) => {
    if(!allowRates.includes(Number(rate))) {
        throw ApiError.badRequest('Указана невалидная оценка')
    }
}

const getFeedback = async (idOrganizer) => {
    return await Feedback.findAndCountAll({where: {idOrganizer}, include: [
            {
                model: Participant,
                as: 'participant',
                attributes: ['nickname', 'logo'],
            }
        ]})
}

class FeedbackService {
    static async getAllFeedbacksByIdOrganizer(req) {
        const {id} = req.params;
        const organizer = await Organizer.findByPk(id);
        if(!organizer) {
            throw ApiError.badRequest('Профиль не найден')
        }
        if(organizer.isHiddenFeedbacks){
            throw ApiError.forbidden('Организатор скрыл отзывы')
        }
        return await getFeedback(id);
    }

    static async getFeedbacksBVyModerator(req) {
        const {idOrganizer} = req.params;
        return await getFeedback(idOrganizer);
    }

    static async getMyFeedbacks(req) {
        const {id: idOrganizer} = req.user;
        return await getFeedback(idOrganizer);
    }

    static async createFeedback(req) {
        const {id} = req.user
        const {rate, feedbacksBody, idOrganizer} = req.body;
        if(!idOrganizer || !rate || !feedbacksBody) {
            throw ApiError.badRequest('Незаполнены поля')
        }
        validityRate(rate)
        const organizer = await Organizer.findByPk(idOrganizer)
        if(!organizer) {
            throw ApiError.badRequest('Профиль организатора не найден')
        }
        if(!organizer.canCreateFeedbacks) {
            throw ApiError.badRequest('Организатор запретил оставлять отзывы')
        }
        const findOldFeedback = await Feedback.findOne({where: {idOrganizer, idParticipant: id}})
        if(findOldFeedback) {
            throw ApiError.badRequest('Вы уже оставили отзыв на этого организатора')
        }
        const resultCheck = await checkRecallsToEvents(idOrganizer, id);
        if(!resultCheck) {
            throw ApiError.badRequest('Для оставления отзыва нужно участвовать хотя бы в одном мероприятии организатора')
        }
        const cleanBody = leoProfanity.clean(feedbacksBody, '*')
        await Feedback.create({idParticipant: id, rate, feedbacksBody: cleanBody, idOrganizer})
        return {message: 'Отзыв оставлен'}
    }
     static async updateFeedback(req) {
         const {id, role} = req.user
         const {id: idFeedback} = req.params;
         const newData = req.body;
         const feedback = await isMyFeedbacks(idFeedback, id)
         if(newData.idOrganizer || newData.idParticipant) {
             throw ApiError.badRequest('Запрос содержит запрещенные для обновления поля')
         }
         if(newData.rate) {
            validityRate(newData.rate)
         }
         if(newData.feedbacksBody) {
             newData.feedbacksBody = leoProfanity.clean(newData.feedbacksBody, '*')
         }
         await feedback.update(newData)
        return {message: 'Отзыв обновлен'}
     }

    static async deleteFeedback(req) {
        const {id, role} = req.user
        const {id: idFeedback} = req.params;
        const feedback = await isMyFeedbacks(idFeedback, id, role)
        await feedback.destroy()
        return {message: 'Отзыв удален'}
    }

}

module.exports = FeedbackService