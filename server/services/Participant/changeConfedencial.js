const ApiError = require("../../errors/ApiError");
const {Participant} = require("../../models");

module.exports = async function(user){
    const {id} = user;
    try{
        const findParticipant = await Participant.findByPk(id)
        if(!findParticipant){
            throw ApiError.badRequest('Участник не найден')
        }
       findParticipant.isConfidential === false ? findParticipant.isConfidential = true : findParticipant.isConfidential = false
        findParticipant.save()
        return ({message: 'Настройки конфеденциальности изменены'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}