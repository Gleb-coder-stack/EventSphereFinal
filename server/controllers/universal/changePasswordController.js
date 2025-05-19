const {badRequest} = require("../../errors/ApiError");
const changePassword = require("../../functions/changeData/changePassword");


module.exports = async function changePasswordController(req, res, next){
    const {id, role} = req.user;
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        return next(badRequest('Введите данные') )
    }
    try{
        const result = await changePassword({id, role}, oldPassword, newPassword);
        return res.status(200).json(result)
    }catch(err){
        return next(err)
    }
}