const ApiError = require( '../errors/ApiError');

const roleModelMap = require('../const/roles')

module.exports = function(role){
    const modelName = roleModelMap[role];
            if (!modelName) {
                throw ApiError.badRequest('Роль не найдена')
            }
            return modelName
}