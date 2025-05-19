const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const RecallController = require('../controllers/RecallController')

router.get('/my', authMiddleware(['participant']), RecallController.getMy);
router.get('/:id', RecallController.getAllByIdEvent);
router.post('/send-recall/:id', authMiddleware(['participant']), RecallController.sendRecallFunc);
router.delete('/:id', authMiddleware(['participant']), RecallController.deleteRecall);

module.exports = router