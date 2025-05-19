const getProfile = require('../services/Organizer/getById')
const updateOrganizer = require("../services/Organizer/updateOrganizer");
const deleteUser = require('../functions/common/user/deleteUser')
const registrationOrganizer = require('../services/Organizer/registration')
const validity = require('../functions/validations/validityData')
const { Organizer } = require('../models')
const firstFactor = require('../functions/common/user/firstFactorParticipantAndOrganizer')
const checkJwtFunc = require('../functions/common/user/checkJwt')
const {badRequest} = require("../errors/ApiError");
const changePasswordController = require("../services/universal/ResetOldPassword");
const SendingMails = require("../email/sendingMails");
const auth = require("../email/TwoFactorAuth");
const secondFactorAuth = require("../functions/common/user/secondFactorAuthParticipantAdnOrganizer");
const setNewPassword = require("../services/universal/setNewPassword");
const updatePass = require("../services/universal/updatePassword");
const {changeIsHiddenFeedbacks, changeCanCreateFeedbacks} = require("../services/Organizer/settings");



const nameModel = Organizer

class OrganizerController {
    static async registration(req, res, next){
        const {name, email, password} = req.body
        if(!name || !email ||!password){
            return next(badRequest('Незаполнены поля'))
        }
        const { error } = validity({email, password});
        if(error){
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }
        try{
            const resultRegistration = await registrationOrganizer(name, email, password)
            const code = auth.createCodeForEmail(email);
            await SendingMails.send2FACode(email, code);
            return res.json(resultRegistration)
        }catch(err){
            next(err)
        }
    }

    static async login (req, res, next){
        const {email, password} = req.body
        if(!email || !password){
            return next('Введите данные')
        }
        try{
            await firstFactor(email, password, nameModel)
            const code = auth.createCodeForEmail(email);
            await SendingMails.send2FACode(email, code);
            return res.json({message: 'Код подтверждения отправлен на почту', email: email})
        }catch(err){
            next(err)
        }
    }

    static async twoFaAuth(req, res, next){
        try{
            const result = await secondFactorAuth(req, Organizer)
            return res.json(result)
        }catch(err){
            next(err);
        }
    }

    static async getMe(req, res, next){
        const {id} = req.user
        const {nameEvent} = req.query
        try{
            const data = await getProfile(id, nameEvent)
            return res.json(data)
        }catch(err){
            return next(err)
        }
    }

    static async getById(req, res, next){
        const {id} = req.params
        const {nameEvent} = req.query
        try{
            const data = await getProfile(id, nameEvent)
            return res.json(data)
        }catch(err){
            return next(err)
        }
    }

    static async updateMe(req, res, next){
        try{
            const result = await updateOrganizer(req)
            return res.json(result)
        }catch(err){
            next(err)
        }
    }

    static async deleteMe (req, res, next){
            const {id, role} = req.user;
            try{
                const result = await deleteUser(id, role)
                return res.json(result)
            }catch(err){
                return next(err)
            }
    }

    static async checkJwt(req, res, next){
            const {id, versionJwt} = req.body;
            try{
                const result = await checkJwtFunc(id, versionJwt, nameModel);
                return res.json(result);
            }catch(err){
                next(err);
            }
    }

    static async updatePassword(req, res, next){
        try{
            const result = await updatePass(req)
            return res.json(result)
        }catch (err){
            next(err);
        }
    }

    static async resetMyPassword(req, res, next){
        try{
            const result =  await changePasswordController(req);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async setNewPasswordController(req, res, next){
        try{
            const result = await setNewPassword(req)
            return res.json(result)
        }catch(err){
            next(err);
        }
    }

    static async changeIsHiddenFeedbacksController(req, res, next){
        try{
            const result = await changeIsHiddenFeedbacks(req)
            return res.json(result)
        }catch (err){
            next(err);
        }
    }
    static async changeCanCreateFeedbacksController(req, res, next){
        try{
            const result = await changeCanCreateFeedbacks(req)
            return res.json(result)
        }catch (err){
            next(err);
        }
    }
}

module.exports = OrganizerController