const {Moderator} = require("../models");
const bcrypt = require("bcrypt");

const createAdmin = async() => {
    try{
        const login = process.env.LOGIN_ADMIN
        const hashPassword = await bcrypt.hash(process.env.PASSWORD_ADMIN, 10);
        const firstAdmin = await Moderator.findOne({where: {login : login}})
        if(!firstAdmin){
           await Moderator.create({login : login, password : hashPassword, role : "admin"})
            console.log('Admin created successfully.')
            return
        }
        console.log("Admin is already created")
    }catch(error){
        console.log(error)
    }
}

module.exports = createAdmin

