const express = require('express')

const router = express.Router();

const addressesController = require('../controllers/addressesController')
const eventsController = require('../controllers/eventsController')
const invitedSpeakersController = require('../controllers/invitedSpeakersController')
const guestController = require('../controllers/guestsController')

const isAuth = require('../middlewares/is-auth')

router.get('/', (req, res, next) => {
    res.json({ message: 'Hello World' });
})

router.get('/address', addressesController.index);
router.get('/address/:id', addressesController.show);
router.post('/address/create', addressesController.create);
router.put('/address/update/:id', addressesController.update);
router.delete('/address/delete/:id', addressesController.delete);

router.delete('/event/guest/delete/:id', guestController.delete);
router.put('/event/guest/update/:id', guestController.update)
router.put('/event/guest/presence', guestController.confirmPresence)
router.get('/event/guest/:id', guestController.show);

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

module.exports = router;
