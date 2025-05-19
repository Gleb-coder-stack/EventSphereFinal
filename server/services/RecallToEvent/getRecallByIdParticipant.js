const {RecallToEvent, Event} = require("../../models");

module.exports = async function (id) {
    try{
        const recalls = await RecallToEvent.findAll({where: {idParticipant: id}, include: [
                {
                    model: Event,
                    as: 'event',
                }
            ]});

        return recalls;
    }catch(err){
        return {found: false, message: err.message};
    }
}