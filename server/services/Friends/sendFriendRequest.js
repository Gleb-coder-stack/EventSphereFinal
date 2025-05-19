const ApiError = require("../../errors/ApiError");
const {FriendShip} = require("../../models");
const getParticipant = require("../Participant/getOnlyParticipantData");
const {Op} = require("sequelize");
const sendingMails = require("../../email/sendingMails");

module.exports = async function(user, idReceiver) {
    const {id: idRequester} = user
    try{
        const checkRequester = await getParticipant(idRequester);
        const checkReceiver = await getParticipant(idReceiver);
        if(idRequester === idReceiver){
            throw ApiError.badRequest('Нелья себя добавить в друзья');
        }
        const checkIsFriends = await FriendShip.findOne({where: {
                status: 'pending',
                [Op.or]: [
                    { idRequester, idReceiver },
                    { idRequester: idReceiver, idReceiver: idRequester }
                ]
            }})
        if(checkIsFriends){
            throw ApiError.badRequest('Вы уже отправили заявку в друзья');
        }
        await FriendShip.create({idReceiver, idRequester});
        await sendingMails.sendInviteToFriend(checkReceiver.email, checkRequester.nickname);
        return ({message: 'Заявка в друзья отправлена'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}