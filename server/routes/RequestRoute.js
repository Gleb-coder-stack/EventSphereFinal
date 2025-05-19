const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const RequestController = require('../controllers/RequestToAccredited')


router.get('/', authMiddleware(['moderator', 'admin']), RequestController.getAllPendingRequests)
router.post('/', authMiddleware(['organizer']),RequestController.create)
router.put('/apply/:id', authMiddleware(['moderator', 'admin']),RequestController.applyRequestFunc)
router.put('/reject/:id', authMiddleware(['moderator', 'admin']),RequestController.rejectRequestFunc)

module.exports = router