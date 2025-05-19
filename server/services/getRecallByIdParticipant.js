const {RecallToEvent} = require("../models");

module.exports = async function (id) {
    try{
        const recalls = await RecallToEvent.findAll({where: {idParticipant: id}, include: [
                {
                    model: Event,
                    as: 'event',
                }
            ]});
        if(recalls.length === 0){
            return {found: false, message: 'Отклики не найдены'}
        }
        return {found: true, recalls: recalls};
    }catch(err){
        return {found: false, message: err}
    }
}