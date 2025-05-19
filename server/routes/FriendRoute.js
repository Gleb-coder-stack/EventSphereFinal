const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const FriendController = require('../controllers/FriendController')

router.get('/friend', authMiddleware(['participant']), FriendController.getAllFriend)
router.get('/invites-to-friend', authMiddleware(['participant']), FriendController.getAllInvitesToFriend)
router.get('/rejected-invites', authMiddleware(['participant']), FriendController.getRejectedInvites)
router.get('/my-invites', authMiddleware(['participant']), FriendController.getMyInvitesToFriend)

router.post('/send-invite/:id', authMiddleware(['participant']), FriendController.sendInviteToFriend)

router.put('/add-to-friends/:id', authMiddleware(['participant']), FriendController.addToFriend)
router.put('/delete-from-friends/:id', authMiddleware(['participant']), FriendController.rejectOrDeleteFromFriend)

module.exports = router