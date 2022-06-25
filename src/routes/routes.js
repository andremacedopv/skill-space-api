const express = require('express')

const router = express.Router();

const addressesController = require('../controllers/addressesController')
const eventsController = require('../controllers/eventsController')
const invitedSpeakersController = require('../controllers/invitedSpeakersController')
const guestsController = require('../controllers/guestsController')
const tagsController = require('../controllers/tagsController')
const postsController = require('../controllers/postsController')

const isAuth = require('../middlewares/is-auth')

router.get('/', (req, res, next) => {
    res.json({ message: 'Hello World' });
})

router.get('/address', addressesController.index);
router.get('/address/:id', addressesController.show);
router.post('/address/create', addressesController.create);
router.put('/address/update/:id', addressesController.update);
router.delete('/address/delete/:id', addressesController.delete);

router.delete('/event/:event_id/guest/delete/:user_id', guestsController.delete);
router.put('/event/:event_id/guest/update/:user_id', guestsController.update)
router.get('/event/:event_id/guest/:user_id', guestsController.show);
router.put('/event/:event_id/guest/presence', guestsController.confirmPresence)

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

router.get('/tag', tagsController.index);
router.get('/tag/:id', tagsController.show);
router.post('/tag/create', tagsController.create);
router.put('/tag/update/:id', tagsController.update);
router.delete('/tag/delete/:id', tagsController.delete);

router.get('/post', postsController.index);
router.get('/post/:id', postsController.show);
router.get('/post/:id/comments', postsController.comments);
router.post('/post/create', isAuth, postsController.create);
router.put('/post/update/:id', postsController.update);
router.delete('/post/delete/:id', postsController.delete);

module.exports = router;
