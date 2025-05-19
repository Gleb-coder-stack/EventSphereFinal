const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const TagController = require('../controllers/TagController')


router.get('/', TagController.getAllTags)
router.post('/', authMiddleware(['moderator', 'admin']),TagController.createTag)
router.put('/:id', authMiddleware(['moderator', 'admin']),TagController.updateTag)
router.delete('/:id', authMiddleware(['moderator', 'admin']),TagController.deleteTag)

module.exports = router