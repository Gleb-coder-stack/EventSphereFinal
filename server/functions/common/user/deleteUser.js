const ApiError = require( "../../../errors/ApiError");
const findModel = require('../../findModelNameByToken')

module.exports = async function(id, role){
    try{
        const modelName = findModel(role)
        const findUser = await modelName.findByPk(id)
        if(!findUser){
            throw ApiError.badRequest('Пользователь не найден')
        }
        await findUser.destroy()
        return ({message: 'Пользователь удален'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}