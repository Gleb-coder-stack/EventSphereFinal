const ApiError = require("../../errors/ApiError");
const checkField = require("../../functions/common/fields/checkRecord");
const checkEvent = require("../../functions/common/fields/checkRecord");
const {Participant, Favourites, Event} = require("../../models");
const err = require("../../errors/ApiError");




class FavoriteServices {
    static async getMyFavourites(req){
            const {id} = req.user
            const checkParticipant = await checkField(id, Participant)
            if(!checkParticipant){
                throw ApiError.badRequest('Участник не найден')
            }
            return await Favourites.findAll({where: {idParticipant: id}, include: [
                    {
                        model: Event,
                        as: 'event',
                        attributes: ['name', 'dateStart', 'status']
                    }
                ]})


    }

    static async addFavourite(req){
        const {id} = req.user
        const {idEvent} = req.body
        const checkUser = await checkField(id, Participant)
        if(!checkUser){
            throw ApiError.badRequest('Участник не найден')
        }
        const checkEvent = await checkField(idEvent, Event)
        if(!checkEvent){
            throw ApiError.badRequest('Мероприятие не найдено')
        }
        const checkAlreadyFavour = await Favourites.findOne({where: {idEvent, idParticipant: id}})
        if(checkAlreadyFavour){
            throw ApiError.badRequest('Мероприятие уже находится в избранном')
        }
        await Favourites.create({idParticipant: id, idEvent})
        return {message: 'Мероприятие добавлено в избранное'}
    }

    static async deleteFavouriteById(req){
        const {id} = req.user
        const {id:idFavourite} = req.params
        const findFavourite = await Favourites.findByPk(idFavourite)
        if(!findFavourite){
            throw ApiError.badRequest('Запись в избранном не найдена')
        }
        if(findFavourite.idParticipant !== Number(id)){
            throw ApiError.forbidden('Нельзя удалять чужую запись в избранном')
        }
        await findFavourite.destroy()
        return {message: 'Запись в избранном удалена'}
    }

    static async clearMyFavourites(req){
        const {id} = req.user
        const findParticipant = await checkField(id, Participant)
        if (!findParticipant){
            throw ApiError.badRequest('Участник не найден')
        }
        await Favourites.destroy({where: {idParticipant: id}})
        return {message: 'Все записи в избранном удалены'}
    }
}

module.exports = FavoriteServices