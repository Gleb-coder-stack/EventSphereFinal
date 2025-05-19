const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const OrganizerController = require('../controllers/OrganizerController')




router.get('/me', authMiddleware(['organizer']), OrganizerController.getMe)
router.get('/:id', OrganizerController.getById)

router.post('/registration', OrganizerController.registration)
router.post('/login', OrganizerController.login)
router.post('/checkJwt', OrganizerController.checkJwt)
router.post('/twoFaAuth', OrganizerController.twoFaAuth)
router.post('/reset-password', OrganizerController.resetMyPassword)

router.put('/update', authMiddleware(['organizer', 'moderator', 'admin']), OrganizerController.updateMe)
router.put('/change-password', authMiddleware(['organizer']), OrganizerController.updatePassword)
router.put('/set-new-password', OrganizerController.setNewPasswordController)
router.put('/set-is-hidden-feedbacks', authMiddleware(['organizer']), OrganizerController.changeIsHiddenFeedbacksController)
router.put('/set-can-create-feedback', authMiddleware(['organizer']), OrganizerController.changeCanCreateFeedbacksController)



router.delete('/delete', authMiddleware(['organizer', 'moderator', 'admin']), OrganizerController.deleteMe)

module.exports = router