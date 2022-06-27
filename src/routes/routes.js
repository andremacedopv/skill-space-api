const express = require('express')

const router = express.Router();

const addressesController = require('../controllers/addressesController')
const eventsController = require('../controllers/eventsController')
const invitedSpeakersController = require('../controllers/invitedSpeakersController')
const guestController = require('../controllers/guestsController')
const activityTypesController = require('../controllers/activityTypesController')
const categoriesController = require('../controllers/categoriesController')
const activitiesController = require('../controllers/activitiesController')

const isAuth = require('../middlewares/is-auth')

router.get('/', (req, res, next) => {
    res.json({ message: 'Hello World' });
})

router.get('/address', addressesController.index);
router.get('/address/:id', addressesController.show);
router.post('/address/create', addressesController.create);
router.put('/address/update/:id', addressesController.update);
router.delete('/address/delete/:id', addressesController.delete);

router.delete('/event/:event_id/guest/delete/:user_id', guestController.delete);
router.put('/event/:event_id/guest/update/:user_id', guestController.update)
router.get('/event/:event_id/guest/:user_id', guestController.show);
router.put('/event/:event_id/guest/presence', guestController.confirmPresence)

router.get('/event/guests/:id', eventsController.invites);
router.post('/event/invite/:id', eventsController.setInvites);
router.get('/event', eventsController.index);
router.post('/event/create', eventsController.create);
router.put('/event/update/:id', eventsController.update);
router.delete('/event/delete/:id', eventsController.delete);
router.get('/event/:id', eventsController.show);
router.post('/event/:id/feedback/create', isAuth, eventsController.createFeedback);
router.get('/event/:id/feedback', eventsController.feedbacks);

router.post('/invited-speaker/create', invitedSpeakersController.create);
router.put('/invited-speaker/update/:id', invitedSpeakersController.update);
router.delete('/invited-speaker/delete/:id', invitedSpeakersController.delete);
router.get('/invited-speaker/:id', invitedSpeakersController.show);
router.get('/invited-speaker', invitedSpeakersController.index);

router.get('/activity/types', activityTypesController.index);
router.get('/activity/types/:id', activityTypesController.show);
router.post('/activity/types/create', activityTypesController.create);
router.put('/activity/types/update/:id', activityTypesController.update);
router.delete('/activity/types/delete/:id', activityTypesController.delete);

router.get('/activity/category', categoriesController.index);
router.get('/activity/category/:id', categoriesController.show);
router.post('/activity/category/create', categoriesController.create);
router.put('/activity/category/update/:id', categoriesController.update);
router.delete('/activity/category/delete/:id', categoriesController.delete);

router.get('/activity', activitiesController.index);
router.get('/activity/:id', activitiesController.show);
router.post('/activity/create', activitiesController.create);
router.put('/activity/update/:id', activitiesController.update);
router.delete('/activity/delete/:id', activitiesController.delete);
router.post('/activity/requirements/add/:id', activitiesController.addRequirements);
router.get('/activity/requirements/:id', activitiesController.requirements);
router.get('/activity/dependents/add/:id', activitiesController.addDependents);
router.get('/activity/dependents/:id', activitiesController.dependents);

module.exports = router;
