const clearBadFields = require('../../functions/clearBadFields')
const {Participant} = require( "../../models");
const getRecall = require('../RecallToEvent/getRecallByIdParticipant')
const {internal, badRequest} = require("../../errors/ApiError");

module.exports = async function(id){
    try{
        const findParticipant = await Participant.findByPk(id)
            if(!findParticipant){
                throw badRequest('Профиль не найден')
            }
            const participantData = clearBadFields(findParticipant)

            const recalls = await getRecall(id)
            participantData.recalls = recalls
            return ({participant: participantData})
        
    }catch(err){
        throw internal(err.message);
    }
}