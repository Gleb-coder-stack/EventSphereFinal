const ApiError = require("../../errors/ApiError");
const checkInviteAdnHerReceiver = require("./checkInviteAndHerReceiver");
const createRecall = require("../RecallToEvent/createRecall");
const sendMails= require('../../email/sendingMails')

module.exports = async function(user, idInvite){
    try{
        const result = await checkInviteAdnHerReceiver(user, idInvite)
        await result.invite.update({status: "approved"})
        await createRecall(result.invite.idEvent, user)
        await sendMails.inviteToEventHasBeenApproved(result.requester.email, result.receiver.nickname, result.event.name)
        return ({message: 'Приглашение принято'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}