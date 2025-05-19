const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const InviteController = require('../controllers/InviteController')

router.get('/my', authMiddleware(['participant']), InviteController.getInvite)
router.post('/', authMiddleware(['participant']), InviteController.sendInvite)
router.put('/approve/:id', authMiddleware(['participant']), InviteController.approveInvite)
router.put('/reject/:id', authMiddleware(['participant']), InviteController.rejectInvite)

module.exports = router
