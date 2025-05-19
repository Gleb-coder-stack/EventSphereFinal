const ApiError = require("../../errors/ApiError");
const {Moderator} = require("../../models");
module.exports = async function(){
    try{
        const moders = await Moderator.findAll({where: {role: 'moderator'}, attributes : ['id','login']})
        return moders;
    }catch(err){
        throw ApiError.internal(err.message);
    }
}