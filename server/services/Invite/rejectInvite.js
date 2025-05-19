const ApiError = require("../../errors/ApiError");
const checkInviteAdnHerReceiver = require("./checkInviteAndHerReceiver");

const sendMails = require("../../email/sendingMails");

module.exports = async function(user, idInvite){
    try{
        const result = await checkInviteAdnHerReceiver(user, idInvite)
        await result.invite.update({status: "rejected"})
        await sendMails.inviteToEventHasBeenRejected(result.requester.email, result.receiver.nickname, result.event.name)
        return ({message: 'Приглашение отклонено'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}