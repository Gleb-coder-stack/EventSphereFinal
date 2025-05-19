const ApiError = require( '../../errors/ApiError')
const findModel = require('../findModelNameByToken')

const checkInaccessibleData = require('../checkInaccessibleFields')

module.exports = async function(user, newData) {
    const checkResult = checkInaccessibleData(newData)
    if(!checkResult){
        throw ApiError.badRequest('Недоступные для обновления поля')
    }
    try{
        const modelName = findModel(user.role)
        const findUser = await modelName.findByPk(user.id)
        if(!findUser){
            throw ApiError.badRequest('Пользователь не найден')
        }
        await findUser.update(newData)
        return ({message: 'Пользователь обновлен'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}