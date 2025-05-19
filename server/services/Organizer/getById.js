const ApiError = require("../../errors/ApiError");
const { Organizer, Feedback } = require("../../models");
const findEvents = require('../Event/getByIdOrganizer')
const clearBadFields = require("../../functions/clearBadFields");
const {Sequelize} = require("sequelize");

module.exports = async function(id, nameEvent) {
    try{
        const findOrganizer = await Organizer.findByPk(id)
        if(!findOrganizer){
            return ApiError.badRequest('Профиль не найден')
        }
        const clearData = clearBadFields(findOrganizer)
        clearData.events = await findEvents(id, nameEvent)
        clearData.avgRate = await Feedback.findOne({
            where: {idOrganizer: id},
            attributes: [[Sequelize.fn("ROUND", Sequelize.fn("AVG", Sequelize.col("rate")), 1), "avgRating"]],
        })
        return ({profile: clearData})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}