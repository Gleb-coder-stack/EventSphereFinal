const ApiError = require("../../errors/ApiError");
const {FriendShip, Participant} = require("../../models");

const allowedStatuses = ['pending', 'friends', 'rejected'];

module.exports = async function(user, status)  {
    const {id: idReceiver} = user
    if (!allowedStatuses.includes(status)) {
        throw ApiError.badRequest("Неверный статус");
    }
    try{
        return await FriendShip.findAll({where: {idReceiver, status: status}, include: [{model: Participant, as: 'requester', attributes: ['id','nickname']}]});
    }catch(err){
        throw ApiError.internal(err.message)
    }
}