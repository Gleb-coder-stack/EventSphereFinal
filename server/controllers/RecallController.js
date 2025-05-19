const deleteRecallFunc = require('../services/RecallToEvent/deleteRecall')
const getMyRecalls = require('../services/RecallToEvent/getRecallByIdParticipant')
const sendRecalls = require('../services/RecallToEvent/createRecall')
const getAllRecalls = require('../services/RecallToEvent/getRecallsByIdEvent')
const {RecallToEvent} = require("../models");

const nameModel = RecallToEvent

class RecallController {
    static async getMy(req, res, next) {
        const {id} = req.user
        try{
            const result = await getMyRecalls(id)
            return res.json(result)
        }catch(err){
            return next(err);
        }
    }

    static async getAllByIdEvent(req, res, next) {
        const {id} = req.params
        try{
            const result = await getAllRecalls(id)
            return res.json(result)
        }catch(err){
            return next(err);
        }
    }

    static async sendRecallFunc(req, res, next) {
        const {id} = req.params
        try{
            const result = await sendRecalls(id, req.user)
            return res.json(result)
        }catch(err){
            return next(err);
        }
    }

    static async deleteRecall(req, res, next) {
        const {id} = req.params
        const {id: idParticipant} = req.user
        try{
            const result = await deleteRecallFunc(idParticipant, id)
            return res.json(result)
        }catch (err){
            return next(err);
        }
    }
}

module.exports = RecallController;