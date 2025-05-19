const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const ParticipantController = require('../controllers/ParticipantController')



router.get('/me', authMiddleware(['participant']), ParticipantController.getMe)
router.get('/:id', ParticipantController.getById)

router.post('/registration', ParticipantController.register)
router.post('/login', ParticipantController.login)
router.post('/checkJwt', ParticipantController.checkJwt)
router.post('/twoFaAuth', ParticipantController.twoFaAuth)
router.post('/reset-password', ParticipantController.resetMyPassword)

router.put('/update', authMiddleware(['participant']), ParticipantController.updateMe)
router.put('/set-new-password', ParticipantController.setNewPasswordController)
router.put('/change-confidential', authMiddleware(['participant']), ParticipantController.changeConfidential)
router.put('/update-password', authMiddleware(['participant']), ParticipantController.updatePasswordController)


router.delete('/delete', authMiddleware(['participant']), ParticipantController.deleteMe)

module.exports = router