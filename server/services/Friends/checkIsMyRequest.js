const ApiError = require("../../errors/ApiError");
const {FriendShip} = require("../../models");
module.exports = async function(idRequest, idReceiver){
    try{
        const request = await FriendShip.findByPk(idRequest)
        if(!request){
            throw ApiError.badRequest('Заявка не найдена')
        }
        const checkIsIReceiver = request.idReceiver === idReceiver
        const checkIsIRequester = request.idRequester === idReceiver
        return {isMy: !(!checkIsIRequester && !checkIsIReceiver), request};

    }catch(err){
        throw ApiError.internal(err.message)
    }
}