module.exports = function (badData = {}){
    const userData = typeof badData.toJSON === 'function' ? badData.toJSON() : { ...badData };
    delete userData.password;
    delete userData.email;
    delete userData.role;
    delete userData.versionJwt;
    return userData;
}