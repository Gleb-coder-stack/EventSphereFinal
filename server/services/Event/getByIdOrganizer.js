const ApiError = require("../../errors/ApiError");
const { Event } = require("../../models");
const {Op} = require("sequelize");

module.exports = async function (idOrganizer, nameEvent) {
    const filters = {idOrganizer};
    if(nameEvent) filters.name = {
        [Op.iLike]: `%${nameEvent}%`,
    };

    try{
        return await Event.findAll({where: filters})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}