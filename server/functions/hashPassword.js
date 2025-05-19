const bcrypt = require("bcrypt");
const uuid = require("uuid");


module.exports = async function (password){
    const intSali = Number(process.env.COUNT_SALT)
    return await bcrypt.hash(password, intSali)
}