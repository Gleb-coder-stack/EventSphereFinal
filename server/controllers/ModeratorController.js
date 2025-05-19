const addModerator = require('../services/Moderator/createModerator');
const ApiError = require("../errors/ApiError");
const {Moderator} = require("../models");
const loginFunc = require('../functions/common/user/loginModerAndAdmin')
const updateModerator = require('../services/Moderator/updateModerator');
const deleteUser = require('../functions/common/user/deleteUser')
const checkJwtFunc = require("../functions/common/user/checkJwt");
const getAllModers = require('../services/Moderator/getAllModerators');

const nameModel = Moderator

class ModeratorController{
    static async createModerator(req, res, next){
        const {login, password} = req.body;
        if(!login || !password){
            return ApiError.badRequest('Заполните поля');
        }
        try{
            const resultCreate = await addModerator(login, password);
            return res.json(resultCreate);
        }catch(err){
            return next(err);
        }
    }

    static async login(req, res, next){
        const {login, password} = req.body;
        if(!login || !password){
            return ApiError.badRequest('Незаполнены поля')
        }
        try{
            const participant = await loginFunc(login, password, nameModel, 'login');
            return res.json(participant);
        }catch(err){
            next(err);
        }
    }

    static async updateModerator(req, res, next){
        const {id} = req.params;
        const newData = req.body;
        try{
            const resultUpdate = await updateModerator(id, newData)
            return res.json(resultUpdate);
        }catch(err){
            return next(err);
        }

    }

    static async deleteModerator(req, res, next){
        const {id} = req.params;
        try{
            const resultDelete = await deleteUser(id, 'moderator');
            return res.json(resultDelete);
        }catch(err){
            return next(err);
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

    static async getAllModerators(req, res, next){
        try{
            const result = await getAllModers();
            return res.json(result);
        }catch(err){
            return next(err);
        }
    }
}

module.exports = ModeratorController;