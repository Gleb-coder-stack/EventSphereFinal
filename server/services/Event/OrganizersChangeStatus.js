const ApiError = require("../../errors/ApiError");
const {Event } = require("../../models");

module.exports = async function(req){
    const {id} = req.params;
    try{
        const findEvent = await Event.findByPk(id);
        if(!findEvent){
            throw ApiError.badRequest('Событие не найдено')
        }

        if(!req.isOwner){
            throw ApiError.forbidden('нельзя менять чужое событие')
        }
        if(findEvent.status !== 'planned' && findEvent.status !== 'closed'){
            throw ApiError.forbidden('Нельзя менять статус события, если оно на модерации, отклонено ей, активно или уже завершено')
        }
        findEvent.status = findEvent.status === 'planned' ? 'closed' : 'planned';

        await findEvent.save();
        return ({message: 'Статус события успешно сменен'});
    }catch(err){
        throw ApiError.internal(err.message)
    }
}