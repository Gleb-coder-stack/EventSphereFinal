const ApiError = require("../../errors/ApiError");
const {FriendShip, Participant} = require("../../models");
const {Op} = require("sequelize");
module.exports = async function(user) {
    const {id: idRequester} = user
    try{
        return await FriendShip.findAll({where: {idRequester, status: {
                    [Op.ne]: "friends"
                }}, include: [{model: Participant, as: 'receiver', attributes: ['nickname']}]});
    }catch(err){
        throw ApiError.internal(err.message)
    }
}