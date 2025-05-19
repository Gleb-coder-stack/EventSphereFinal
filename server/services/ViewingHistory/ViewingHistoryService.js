const checkParticipant = require('../../functions/common/fields/checkRecord')
const {Participant, ViewingHistory, Event} = require("../../models");
const ApiError = require("../../errors/ApiError");

class ViewingHistoryService{
    static async getMyHistory(req){
        const {id} = req.user
        const resultCheck = await checkParticipant(id, Participant)
        if(!resultCheck){
            throw ApiError.badRequest('Участник не найден')
        }
        return await ViewingHistory.findAll({where: {idParticipant: id}, include: [
                {
                    model: Event,
                    as: 'event',
                    attributes: ['id', 'name'],
                }
            ]})
    }

    static async addHistory(req){
        const {id} = req.params
        const {id: idParticipant} = req.user
        await ViewingHistory.create({idEvent:id, idParticipant})
    }
}
module.exports=ViewingHistoryService