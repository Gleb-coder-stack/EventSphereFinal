const StatsService = require('../services/Stats/StatService');

class StatsController {
    static async getStatsByEventId(req, res, next) {
        try{
           const result = await StatsService.getEventStats(req)
            return res.json(result)
        }catch(err){
            next(err);
        }
    }

    static async viewEventPage(req, res, next){
        try{
            await StatsService.viewEvent(req)
        }catch(err){
            next(err);
        }
    }

    static async viewOrganizer(req, res, next){
        try{
            await StatsService.viewOrganizerProfile(req)
        }catch(err){
            next(err);
        }
    }
}

module.exports = StatsController;