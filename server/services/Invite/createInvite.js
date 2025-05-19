const ApiError = require("../../errors/ApiError");
const { InviteToEvent, FriendShip} = require("../../models");
const { Op} = require("sequelize");
const findEvent = require('../Event/getOnlyEventById')
const SendingMails = require("../../email/SendingMails");
const getParticipant = require("../Participant/getOnlyParticipantData");


module.exports = async function(user, idParticipant, idEvent){
    const {id} = user //Кто хочет отправить
    try{
        const checkEvent = await findEvent(idEvent)
        const receiver = await getParticipant(idParticipant)
        const requester = await getParticipant(id)
        const checkIsFriends = await FriendShip.findOne({where: {
                status: 'friends',
                [Op.or]: [
                    { idRequester: id, idReceiver: idParticipant },
                    { idRequester: idParticipant, idReceiver: id }
                ]
            }})
        if(!checkIsFriends){
            throw ApiError.badRequest('Вы можете оптправлять приглашения только друзьям')
        }
        await InviteToEvent.create({idRequester: id, idReceiver: idParticipant, idEvent})
        await SendingMails.sendInviteToEvent(receiver.email,requester.nickname, checkEvent.name)
        return ({message: "Приглашение отправлено"})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}