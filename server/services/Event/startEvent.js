const ApiError = require("../../errors/ApiError");
const {Event } = require("../../models");
const getEmails = require('../../services/RecallToEvent/getParticipantsEmails');
const sendMails = require("../../email/sendingMails");


module.exports = async function (req){
    const {id} = req.params;
    if(!req.isOwner){
        throw ApiError.forbidden('Нельзя менять статус чужого события')
    }
    try{
        const findEvent = await Event.findByPk(id);
        if(!findEvent){
            throw ApiError.badRequest('Событие не найдено')
        }
        await findEvent.update({status: 'active'})
        const recallsWithEmails = await getEmails(id)
        await sendMails.sendNoticeOfStartEvent(recallsWithEmails, findEvent.name);
        return ({message: 'Событе начато'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}