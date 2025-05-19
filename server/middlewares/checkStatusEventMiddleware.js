const { Event } = require("../models");

module.exports = function(allowedStatuses=[]) {
    return async (req, res, next) => {
        const {id} = req.params
        try{

            const findEvent = await Event.findByPk(Number(id))
            if(!findEvent){
                return res.status(404).json({message: "Событие не найдено"})
            }
            if(!allowedStatuses.includes(findEvent.status)){
                return res.status(403).json({message: "Статус события не позволяет получить к нему доступ"})
            }
            if(req.user){
                const {id: idEntry, role} = req.user;

                (role === 'organizer' && findEvent.idOrganizer === idEntry) ? req.isOwner = true : req.isOwner = false

            }
            next()
        }catch(err){
            return res.status(500).json({message:"Ошибка при проверке статуса", error: err.message})
        }

    }
}