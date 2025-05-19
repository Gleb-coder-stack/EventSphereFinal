const ApiError = require("../../errors/ApiError");
const checkIsMeRequest = require("./checkIsMyRequest");
const getParticipant = require("../Participant/getOnlyParticipantData");
const sendingMails = require("../../email/sendingMails");

module.exports = async function(idRequestToFriend, user, isApprove) {
    //true - приянть в друзья, false - отклонить или удалить из друзей
    const {id: idReceiver} = user
    try{
        const result = await checkIsMeRequest(idRequestToFriend, idReceiver);
        if(!result.isMy){
            throw ApiError.badRequest('Заявка в друзья не пренадлежит вам')
        }
        const checkRequester = await getParticipant(result.request.idRequester);//кому отправить сообщение
        const checkReceiver = await getParticipant(idReceiver); //тот, кто меняет
        if(isApprove){
            await result.request.update({status: 'friends'})
            await sendingMails.inviteToFriendHasBeenApproved(checkRequester.email, checkReceiver.nickname )
        }   else{
            await sendingMails.inviteToFriendHasBeenRejected(checkRequester.email, checkReceiver.nickname )
            await result.request.update({status: 'rejected'})
        }
        return ({message: `Статус заявки сменен`})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}