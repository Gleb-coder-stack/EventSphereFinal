const {Organizer} = require("../../models");
const ApiError = require("../../errors/ApiError");

async function changeIsHiddenFeedbacks(req) {
    const {id} = req.user
    const organizer =  await Organizer.findByPk(id)
    if (!organizer) {
        throw ApiError.badRequest('Орагнизатор не найден')
    }
    organizer.isHiddenFeedbacks = !organizer.isHiddenFeedbacks
    await organizer.save()
    return {message: `Отзывы ${organizer.isHiddenFeedbacks ? 'закрыты' : 'окрыты'}`}
}

async function changeCanCreateFeedbacks(req) {
    const {id} = req.user
    const organizer =  await Organizer.findByPk(id)
    if (!organizer) {
        throw ApiError.badRequest('Орагнизатор не найден')
    }
     organizer.canCreateFeedbacks = !organizer.canCreateFeedbacks
    await organizer.save()
    return {message: `Возможность оставлять отзывы ${organizer.canCreateFeedbacks ? 'доступна' : 'не доступна'}`}
}

module.exports = {
    changeIsHiddenFeedbacks,
    changeCanCreateFeedbacks,
}