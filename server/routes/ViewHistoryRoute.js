const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const ViewHistoryController = require('../controllers/ViewHistoryController')

router.get('/', authMiddleware(['participant']), ViewHistoryController.getMyHistory)

router.post('/:id', authMiddleware(['participant']), ViewHistoryController.addToHistory)

module.exports = router