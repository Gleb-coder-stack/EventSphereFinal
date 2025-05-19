const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const ModeratorController = require('../controllers/ModeratorController')

router.get('/moderators', authMiddleware(['admin']), ModeratorController.getAllModerators);

router.post('/create-moderator', authMiddleware(['admin']), ModeratorController.createModerator)
router.post('/login', ModeratorController.login)
router.post('/checkJwt', ModeratorController.checkJwt)
router.put('/update-moderator/:id', authMiddleware(['admin']), ModeratorController.updateModerator)
router.delete('/delete-moderator/:id', authMiddleware(['admin']), ModeratorController.deleteModerator)

module.exports = router