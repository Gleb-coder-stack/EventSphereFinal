const sendInvite = require('../services/Friends/sendFriendRequest')
const moveToRequest = require('../services/Friends/moveToRequest')
const getAllWithStatus = require('../services/Friends/getAllFriendsWithStatus')
const getMyRequest = require('../services/Friends/getMyFriendsRequests')

class FriendController {
    static async sendInviteToFriend (req, res, next) {
        const {id} = req.params //Кому отправляем заявку
        try{
            const result = await sendInvite(req.user, id)
            return res.json(result)
        }catch(err){
            return next(err)
        }
    }

    static async addToFriend (req, res, next) {
        const {id} = req.params //Какую заявку принимаем
        try{
            const result = await moveToRequest(id, req.user, true)
            return res.json(result)
        }catch(err){
            return next(err)
        }
    }

    static async rejectOrDeleteFromFriend (req, res, next) {
        const {id} = req.params //Какую заявку принимаем
        try{
            const result = await moveToRequest(id, req.user, false)
            return res.json(result)
        }catch(err){
            return next(err)
        }
    }

    static async getAllFriend (req, res, next) {
        try{
            const result = await getAllWithStatus(req.user, 'friends')
            return res.json(result)
        }catch(err){
            return next(err)
        }
    }

    static async getAllInvitesToFriend (req, res, next) {
        try{
            const result = await getAllWithStatus(req.user, 'pending')
            return res.json(result)
        }catch(err){
            return next(err)
        }
    }

    static async getRejectedInvites (req, res, next) {
        try{
            const result = await getAllWithStatus(req.user, 'rejected')
            return res.json(result)
        }catch(err){
            return next(err)
        }
    }

    static async getMyInvitesToFriend (req, res, next) {
        try{
            const result = await getMyRequest(req.user)
            return res.json(result)
        }catch(err){
            return next(err)
        }
    }
}

module.exports = FriendController