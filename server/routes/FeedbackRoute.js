const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const FeedbackController = require('../controllers/FeedbackController')

router.get('/my', authMiddleware(['organizer']), FeedbackController.getMyFeedbacksController)
router.get('/secure/:id', authMiddleware(['moderator', 'admin']), FeedbackController.getByModerator)
router.get('/:id', FeedbackController.getAllByOrganizerId)

router.post('/', authMiddleware(['participant']), FeedbackController.createFeedback)

router.put('/:id', authMiddleware(['participant']), FeedbackController.updateFeedback)

router.delete('/:id', authMiddleware(['participant', 'moderator', 'admin']), FeedbackController.deleteFeedback)

module.exports = router