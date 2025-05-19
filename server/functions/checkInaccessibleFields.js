module.exports = function (dataForUpdate = {}){
    return !(dataForUpdate.role || dataForUpdate.password || dataForUpdate.email || dataForUpdate.versionJwt);
}