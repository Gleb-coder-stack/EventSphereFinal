const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const FavouriteController = require('../controllers/FavouriteController')

router.get('/my', authMiddleware(['participant']), FavouriteController.getMy)

router.post('/', authMiddleware(['participant']), FavouriteController.addFavourite )


router.delete('/clear', authMiddleware(['participant']), FavouriteController.clearMyFavourite)
router.delete('/:id', authMiddleware(['participant']), FavouriteController.deleteFavouriteById)


module.exports = router