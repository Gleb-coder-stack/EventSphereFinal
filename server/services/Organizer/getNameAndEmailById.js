const {Organizer} = require("../../models");
const ApiError = require("../../errors/ApiError");
module.exports = async function(id){
    const organizer = await Organizer.findByPk(id)
    if(!organizer){
        throw ApiError.badRequest('Организатор не найден')
    }
    return organizer
}