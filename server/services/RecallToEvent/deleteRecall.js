const deleteData = require('../../functions/common/fields/deleteData')
const ApiError = require("../../errors/ApiError");
const {RecallToEvent} = require("../../models");


module.exports = async function(idUser, idRecall){
    try{
        const recall = await RecallToEvent.findByPk(idRecall);
        if(!recall) {
            throw ApiError.badRequest('Запись не найдена')
        }
        if(recall.idParticipant !== idUser){
            throw ApiError.forbidden('Нельзя удалять чужие отклики')
        }
        const result = await deleteData(idRecall, RecallToEvent);
        return result
    }catch(err){
        return ApiError.internal(err.message)
    }
}