const {Participant} = require("../../models");
const ApiError = require("../../errors/ApiError");
module.exports = async function getParticipant(id){
    const participant = await Participant.findByPk(id, {attributes: ['id', 'nickname', 'email']});
    if(!participant){
        throw ApiError.badRequest('Участник не найден');
    }
    return participant;
}