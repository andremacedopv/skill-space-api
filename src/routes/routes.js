const express = require('express')

const router = express.Router();

const addressesController = require('../controllers/addressesController')
const eventsController = require('../controllers/eventsController')
const invitedSpeakersController = require('../controllers/invitedSpeakersController')
const activityTypesController = require('../controllers/activityTypesController')
const categoriesController = require('../controllers/categoriesController')
const activitiesController = require('../controllers/activitiesController')
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

router.get('/tag', tagsController.index);
router.post('/tag/create', tagsController.create);
router.put('/tag/update/:id', tagsController.update);
router.delete('/tag/delete/:id', tagsController.delete);
router.post('/tag/follow/:id', isAuth, tagsController.follow);
router.post('/tag/follow/toggle/:id', isAuth, tagsController.toggleFollow);
router.delete('/tag/unfollow/:id', isAuth, tagsController.unfollow);
router.get('/tag/followed', isAuth, tagsController.followedTags);
router.get('/tag/:id', tagsController.show);

router.get('/post', postsController.index);
router.get('/post/:id', postsController.show);
router.get('/post/:id/comments', postsController.comments);
router.post('/post/create', isAuth, postsController.create);
router.put('/post/update/:id', postsController.update);
router.delete('/post/delete/:id', postsController.delete);

module.exports = router;
