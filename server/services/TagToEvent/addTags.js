const ApiError = require("../../errors/ApiError");
const {Event, TagForEvent} = require("../../models");
const checkEvent = require("../../functions/common/fields/checkRecord");
const checkTags = require("../Tag/validateTags");

module.exports = async function(idEvent, tagIds){
    const tags = Array.isArray(tagIds) ? tagIds : [tagIds]
    if (tags.length === 0) throw ApiError.badRequest("Не указаны теги");
    try{
        const resultCheckEvent = await checkEvent(idEvent, Event);
        if(!resultCheckEvent){
            throw ApiError.badRequest('Событие не найдено')
        }
        const resultCheckTags = await checkTags(tags)
        const recordsToCreate = tags.map(tagId => ({
            idEvent,
            idTag: tagId
        }));
        await TagForEvent.bulkCreate(recordsToCreate)
        return ({message: 'Теги успешно добавлены'})
    }catch (err){
        throw ApiError.internal(err.message)
    }
}