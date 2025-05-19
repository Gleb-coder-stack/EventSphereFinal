const {RecallToEvent, Participant} = require("../../models");
const ApiError = require("../../errors/ApiError");
module.exports = async function (id){
    try{
        return await RecallToEvent.findAll({where: {idEvent: id}, include: [
                {
                    model: Participant,
                    as: 'participant',
                    attributes: ['email']
                }
            ]});
    }catch(e){
        ApiError.internal(e.message);
    }
}