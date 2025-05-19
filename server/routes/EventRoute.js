const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const eventStatusMiddleware = require('../middlewares/checkStatusEventMiddleware')
const checkForbiddenFieldsMiddleware = require('../middlewares/checkForbiddenField')
const EventController = require('../controllers/EventController')

router.get('/', EventController.getAllEvents);
router.get('/my', authMiddleware(['organizer']), EventController.getMyEvents);
router.get('/moderation', authMiddleware(['admin', 'moderator']), EventController.getAllModeration);
router.get('/recommended', authMiddleware(['participant']), EventController.getRecommendedEvents)
router.get('/owner/:id',  authMiddleware(['admin', 'moderator']), EventController.getEventById);
router.get('/:id',  eventStatusMiddleware(['active', 'planned', 'closed', 'finished']), EventController.getEventById);

router.post('/create-event', authMiddleware(['organizer']), EventController.createEvent);


router.put('/apply/:id',authMiddleware(['admin', 'moderator']), eventStatusMiddleware(['moderation']),  EventController.applyEventFunc);
router.put('/reject/:id', authMiddleware(['admin', 'moderator']), eventStatusMiddleware(['moderation']),  EventController.rejectEventFunc);

router.put('/start/:id', authMiddleware(['organizer']), eventStatusMiddleware(['planned', 'closed']),  EventController.startEvent);
router.put('/finish/:id', authMiddleware(['organizer']), eventStatusMiddleware(['active']),  EventController.finishEvent);

router.put('/changeStatus/:id', authMiddleware(['organizer']),  eventStatusMiddleware(['planned', 'closed']),  EventController.closeOrPlannedEvent);

router.put('/update/:id', authMiddleware(['organizer']),  eventStatusMiddleware(['planned', 'moderation']),  EventController.updateEvent);



router.delete('/:id', authMiddleware(['organizer']), eventStatusMiddleware(['moderation', 'rejected', 'planned', 'closed']),  EventController.deleteEvent);

module.exports = router;


//Статусы события: moderation, rejected, planned, active, finished, closed