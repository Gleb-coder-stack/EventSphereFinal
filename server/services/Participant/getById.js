const ApiError = require("../../errors/ApiError");
const { badRequest } = require("../../errors/ApiError");
const { Participant } = require("../../models");
const clearPassword = require("../../functions/clearBadFields");
const getRecall = require('../RecallToEvent/getRecallByIdParticipant')


module.exports = async function(id){
    try{
        const findParticipant = await Participant.findByPk(id)
            if(!findParticipant){
                throw ApiError.badRequest('Участник не найден')
            }
        const participantData = clearPassword(findParticipant)
            if(!findParticipant.isConfidential){
                const recalls = await getRecall(id)
                participantData.recalls = recalls
                return ({participant: participantData})
            }
        return ({participant: participantData})
    }catch(error){
        throw ApiError.internal(error.message);
    }
}