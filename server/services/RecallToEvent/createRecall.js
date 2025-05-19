const ApiError = require("../../errors/ApiError");
const checkRecord = require("../../functions/common/fields/checkRecord");
const {Event, RecallToEvent} = require("../../models");


module.exports = async function(idEvent, user){
    const {id} = user
    try{
        const resultFound = await checkRecord(idEvent, Event);
        if(!resultFound){
            throw ApiError.badRequest('Мероприятие не найдено')
        }
        const oldRecall = await RecallToEvent.findOne({where: {idEvent, idParticipant: id}})
        if(oldRecall){
            throw ApiError.badRequest('Вы уже участвуете в мероприятии')
        }
        await RecallToEvent.create({idEvent, idParticipant: id});
        return ({messagge: 'Вы успешно откликнулись'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}