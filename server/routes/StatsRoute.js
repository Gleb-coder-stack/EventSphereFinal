const Router = require('express')
const router = new Router()
const StatsController = require('../controllers/StatsController')

router.get('/event-stats/:id', StatsController.getStatsByEventId)

router.put('/view-event/:id', StatsController.viewEventPage)
router.put('/view-organizer/:id', StatsController.viewOrganizer)


module.exports = router