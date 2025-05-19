const createInvite = require("../services/Invite/createInvite");
const getMyInvites = require("../services/Invite/getAllPendingsInvites");
const approveInvite = require("../services/Invite/approveInvite");
const rejectInvite = require("../services/Invite/rejectInvite");


class InviteController {
    static async sendInvite(req, res, next) {
        const {idParticipant, idEvent} = req.body;
        try{
            const result = await createInvite(req.user, idParticipant, idEvent);

            return res.json(result);
        }catch(err){
            return next(err);
        }
    }

    static async getInvite(req, res, next) {
        try{
            const result = await getMyInvites(req.user);
            return res.json(result);
        }catch (err){
            return next(err);
        }
    }

    static async approveInvite(req, res, next) {
       const {id} = req.params;

       try{
           const result = await approveInvite(req.user,id);
           return res.json(result);
       }catch (err){
           return next(err);
       }
    }

    static async rejectInvite(req, res, next) {
        const {id} = req.params;
        try{
            const result = await rejectInvite(req.user, id);
            return res.json(result);
        }catch (err){
            return next(err);
        }
    }
}
module.exports = InviteController;