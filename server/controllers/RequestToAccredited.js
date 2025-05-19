const {createRequest,
    applyRequest,
    rejectRequest,
    getAllPendingRequests} = require('../services/RequestToAccredited/RequestToAccredited');

class RequestToAccredited {
    static async create(req, res, next) {
        try{
            const result = await createRequest(req);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async getAllPendingRequests(req, res, next) {
        try{
            const results = await getAllPendingRequests();
            return res.json(results);
        }catch(err){
            next(err);
        }
    }

    static async applyRequestFunc(req, res, next) {
        try{
            const result = await applyRequest(req);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }

    static async rejectRequestFunc(req, res, next) {
        try{
            const result = await rejectRequest(req);
            return res.json(result);
        }catch(err){
            next(err);
        }
    }
}

module.exports = RequestToAccredited;