const jwt = require( "jsonwebtoken");

module.exports = function (id, role, versionJwt){
    return jwt.sign(
        {id, role, versionJwt},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}