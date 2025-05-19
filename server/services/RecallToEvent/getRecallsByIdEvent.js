const ApiError = require("../../errors/ApiError");
const {RecallToEvent, Participant} = require("../../models");
module.exports = async function(idEvent){
    try{
        const recallParticipants = await RecallToEvent.findAll({where: {idEvent: idEvent}, include: [
                {
                    model: Participant,
                    as: 'participant',
                    attributes: ['id', 'nickname'],
                }
            ]});
        return recallParticipants
    }catch (err){
        throw ApiError.internal(err.message);
    }
}