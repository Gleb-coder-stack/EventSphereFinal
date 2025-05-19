const ApiError = require("../../errors/ApiError");
const {Event } = require("../../models");
const getEmailAndNameOrganizer = require("../Organizer/getNameAndEmailById")
const sendingMails = require('../../email/sendingMails')


async function applyEvent(idEvent){
    try{
        const findEvent = await Event.findByPk(idEvent);

        if(!findEvent){
            throw ApiError.badRequest('Событие не найдено')
        }
        if(findEvent.status !== 'moderation'){
            throw ApiError.badRequest('Событие уже прошло модерацию')
        }
        const organizersEmail = await getEmailAndNameOrganizer(findEvent.idOrganizer)
        await findEvent.update({status: 'planned'})
        await sendingMails.eventHasBeenApproved(organizersEmail.email, findEvent.name)
        return ({message: 'Событие одобрено'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}

async function rejectEvent(idEvent){
    try{
        const findEvent = await Event.findByPk(idEvent);
        if(!findEvent){
            throw ApiError.badRequest('Событие не найдено')
        }
        if(findEvent.status !== 'moderation'){
            throw ApiError.badRequest('Событие уже прошло модерацию')
        }
        const organizersEmail = await getEmailAndNameOrganizer(findEvent.idOrganizer)
        await findEvent.update({status: 'rejected'})
        await sendingMails.eventHasBeenApproved(organizersEmail.email, findEvent.name)
        return ({message: 'Событие отклонено'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}

module.exports = {
    applyEvent,
    rejectEvent,
}

