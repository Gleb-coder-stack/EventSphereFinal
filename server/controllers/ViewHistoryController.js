const ViewHistoryService = require('../services/ViewingHistory/ViewingHistoryService')

class ViewHistoryController{
    static async getMyHistory(req, res, next){
        try{
            const result = await ViewHistoryService.getMyHistory(req)
            return res.json(result)
        }catch (err){
            next(err)
        }
    }

    static async addToHistory(req, res, next){
        try{
            await ViewHistoryService.addHistory(req)
        }catch (err){
            next(err)
        }
    }
}

module.exports=ViewHistoryController