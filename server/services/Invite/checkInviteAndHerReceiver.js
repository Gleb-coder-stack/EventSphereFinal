const {InviteToEvent, Participant, Event} = require("../../models");
const ApiError = require("../../errors/ApiError");
module.exports = async function(user, idInvite){
    const {id} = user;
    try{

        const invite = await InviteToEvent.findByPk(idInvite);
        if(!invite){
            throw ApiError.badRequest('Приглашение не найдено')
        }
        if(invite.idReceiver !== id){
            throw ApiError.forbidden('Нельзя менять чужие приглашения')
        }
        const receiver = await Participant.findByPk(id)
        const requester =await Participant.findByPk(invite.idRequester)
        const event = Event.findByPk(invite.idEvent)
        return {invite: invite, requester: requester, receiver: receiver, event: event};
    }catch(err){
        throw ApiError.internal(err.message)
    }
}