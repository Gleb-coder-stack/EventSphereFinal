const FeedbackService = require('../services/Feedback/FeedbackService');
const res = require("express/lib/response");

class FeedbackController {
    static async getAllByOrganizerId(req, res, next) {
        try{
           const result = await FeedbackService.getAllFeedbacksByIdOrganizer(req)
            return res.json(result);
        }catch(err){
            next(err)
        }
    }

    static async getByModerator(req, res, next) {
        try{
            const result = await FeedbackService.getFeedbacksBVyModerator(req)
            return res.json(result);
        }catch(err){
            next(err)
        }
    }
    static async getMyFeedbacksController(req, res, next) {
        try{
            const result = await FeedbackService.getMyFeedbacks(req)
            return res.json(result);
        }catch(err){
            next(err)
        }
    }


    static async createFeedback(req, res, next) {
        try{
            const result = await FeedbackService.createFeedback(req)
            return res.json(result)
        }catch(err){
            next(err)
        }
    }

    static async updateFeedback(req, res, next) {
        try{
            const result = await FeedbackService.updateFeedback(req)
            return res.json(result)
        }catch(err){
            next(err)
        }
    }

    static async deleteFeedback(req, res, next) {
        try{
            const result = await FeedbackService.deleteFeedback(req)
            return res.json(result)
        }catch(err){
            next(err)
        }
    }
}

module.exports = FeedbackController;