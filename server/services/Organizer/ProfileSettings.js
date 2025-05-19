import {Organizer} from "../../models";
import ApiError from "../../errors/ApiError";

const findOrganizer = async (id) => {
    const organizer = await Organizer.findByPk(id)
    if (!organizer) {
        throw ApiError.badRequest('Организатор не найден')
    }
    return organizer
}


class ProfileSettings {
    static async hideFeedbacks(req) {
        const {id} = req.user
        const organizer = await findOrganizer(id)
        organizer.isHiddenFeedbacks = !organizer.isHiddenFeedbacks
        await organizer.save()
        return {message: `Показ отзывов ${!organizer.isHiddenFeedbacks ? 'открыт' : 'закрыт'}`}
    }

    static async changeCanCreateFeedback(req) {
        const {id} = req.user
        const organizer = await findOrganizer(id)
        organizer.canCreateFeedbacks = !organizer.canCreateFeedbacks
        await organizer.save()
        return {message: `В ваш профиль ${organizer.canCreateFeedbacks ? 'можно' : 'нельзя'} оставлять отзывы`}
    }
}

module.exports = ProfileSettings