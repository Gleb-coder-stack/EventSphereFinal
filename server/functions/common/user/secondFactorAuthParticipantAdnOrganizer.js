const ApiError = require("../../../errors/ApiError");
const generateJwtAfter2fa = require("./generateJwtAfter2fa");
const SendingMails = require("../../../email/sendingMails");
const auth = require("../../../email/TwoFactorAuth");

module.exports = async function secondFactorAuth(req, nameModel){
        const {email, code} = req.body
        const resultVerify = auth.verifyCode(email, code);
        if(!resultVerify){
            throw ApiError.badRequest('Введен неверный код');
        }
        const resToken = await generateJwtAfter2fa(email, nameModel);
        await SendingMails.sendNoticeToEntry(email)
        return resToken;
}