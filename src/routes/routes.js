const express = require('express')

const router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");

const addressesController = require('../controllers/addressesController')
const eventsController = require('../controllers/eventsController')
const invitedSpeakersController = require('../controllers/invitedSpeakersController')
const activityTypesController = require('../controllers/activityTypesController')
const categoriesController = require('../controllers/categoriesController')
const activitiesController = require('../controllers/activitiesController')
const guestsController = require('../controllers/guestsController')
const tagsController = require('../controllers/tagsController')
const postsController = require('../controllers/postsController')
const stagesController = require('../controllers/stagesController')
const reactionsController = require('../controllers/reactionsController')
const followersController = require('../controllers/followersController')
const activityUsersController = require('../controllers/activityUsersController')
const chatsController = require('../controllers/chatsController')
const messagesController = require('../controllers/messagesController')
const permissionsController = require('../controllers/permissionsController')

const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');
const hasPermission = require('../middlewares/has-permission')

router.get('/', (req, res, next) => {
    res.json({ message: 'Hello World' });
})

router.get('/address', isAuth, isAdmin, addressesController.index);
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
router.get('/event', isAuth, eventsController.index);
router.get('/event/my_invites', isAuth, eventsController.myInvites);
router.post('/event/create', isAuth, hasPermission("modify_events"), eventsController.create);
router.put('/event/update/:id', isAuth, hasPermission("modify_events"), eventsController.update);
router.delete('/event/delete/:id', isAuth, hasPermission("delete_events"), eventsController.delete);
router.get('/event/:id', isAuth, eventsController.show);
router.post('/event/:id/feedback/create', isAuth, eventsController.createFeedback);
router.get('/event/:id/feedback', eventsController.feedbacks);

router.post('/invited-speaker/create', isAuth, hasPermission("modify_invitedSpeakers"), invitedSpeakersController.create);
router.put('/invited-speaker/update/:id', isAuth, hasPermission("modify_invitedSpeakers"), invitedSpeakersController.update);
router.delete('/invited-speaker/delete/:id', isAuth, hasPermission("delete_invitedSpeakers"), invitedSpeakersController.delete);
router.get('/invited-speaker/:id', invitedSpeakersController.show);
router.get('/invited-speaker', invitedSpeakersController.index);

router.get('/activity/types', activityTypesController.index);
router.get('/activity/types/:id', activityTypesController.show);
router.post('/activity/types/create', activityTypesController.create);
router.put('/activity/types/update/:id', activityTypesController.update);
router.delete('/activity/types/delete/:id', activityTypesController.delete);

router.get('/activity/category', categoriesController.index);
router.get('/activity/category/:id', categoriesController.show);
router.post('/activity/category/create', isAuth, hasPermission("modify_categories"), categoriesController.create);
router.put('/activity/category/update/:id', isAuth, hasPermission("modify_categories"), categoriesController.update);
router.delete('/activity/category/delete/:id', isAuth, hasPermission("delete_categories"), categoriesController.delete);

router.post('/activity/start/:id', isAuth, activityUsersController.start);
router.post('/activity/finish/:id', isAuth, multer(multerConfig).single("file"), activityUsersController.finish);
router.put('/activity/submission/edit/:id', isAuth, activityUsersController.editSubmission);
router.get('/activity/manager/submission/:act_id/:user_id', isAuth, isAdmin, activityUsersController.userSubmission);
router.get('/activity/manager/submissions', isAuth, isAdmin, activityUsersController.indexSubmissions);
router.get('/activity/manager/feedback/pending', isAuth, isAdmin, activityUsersController.pendingFeedbacks);
router.post('/activity/manager/feedback/:act_id/:user_id', isAuth, isAdmin, activityUsersController.giveFeedback);
router.put('/activity/manager/feedback/edit/:act_id/:user_id', isAuth, isAdmin, activityUsersController.editFeedback);
router.get('/activity/submission/:id', isAuth, activityUsersController.mySubmission);
router.get('/activity/user', isAuth, activityUsersController.userIndex);

router.get('/activity', activitiesController.index);
router.get('/activity/:id', activitiesController.show);
router.post('/activity/create', isAuth, hasPermission("modify_activities"), activitiesController.create);
router.put('/activity/update/:id', isAuth, hasPermission("modify_activities"), activitiesController.update);
router.delete('/activity/delete/:id', isAuth, hasPermission("delete_activities"), activitiesController.delete);
router.post('/activity/requirements/add/:id', isAuth, hasPermission("modify_activities"), activitiesController.addRequirements);
router.get('/activity/requirements/:id', isAuth, hasPermission("modify_activities"), activitiesController.requirements);
router.get('/activity/dependents/add/:id', isAuth, hasPermission("modify_activities"), activitiesController.addDependents);
router.get('/activity/dependents/:id', activitiesController.dependents);

router.get('/tag', tagsController.index);
router.post('/tag/create', isAuth, hasPermission("modify_tags"), tagsController.create);
router.put('/tag/update/:id', isAuth, hasPermission("modify_tags"), tagsController.update);
router.delete('/tag/delete/:id', isAuth, hasPermission("delete_tags"), tagsController.delete);
router.post('/tag/follow/:id', isAuth, tagsController.follow);
router.post('/tag/follow/toggle/:id', isAuth, tagsController.toggleFollow);
router.delete('/tag/unfollow/:id', isAuth, tagsController.unfollow);
router.get('/tag/followed', isAuth, tagsController.followedTags);
router.get('/tag/:id', tagsController.show);

router.get('/post', postsController.index);
router.get('/post/feed', isAuth, postsController.feed);
router.get('/post/:id', postsController.show);
router.get('/post/:id/comments', postsController.comments);
router.post('/post/create', isAuth, postsController.create);
router.put('/post/update/:id', postsController.update);
router.delete('/post/delete/:id', postsController.delete);

router.get('/stage', stagesController.index);
router.get('/stage/my', isAuth, stagesController.myStages);
router.get('/stage/my/:id', isAuth, stagesController.myStageActivities);
router.post('/stage/start/:id', isAuth, stagesController.startStage);
router.post('/stage/finish/:id', isAuth, stagesController.finishStage);
router.get('/stage/:id', stagesController.show);
router.post('/stage/create', isAuth, hasPermission("modify_stages"), stagesController.create);
router.put('/stage/update/:id', isAuth, hasPermission("modify_stages"), stagesController.update);
router.delete('/stage/delete/:id', isAuth, hasPermission("delete_stages"), stagesController.delete);

router.post('/follow/:id', isAuth, followersController.follow);
router.get('/followers/:id', followersController.followers);
router.get('/followers/count/:id', followersController.followerCount);
router.get('/following/count/:id', followersController.followingCount);
router.get('/following/:id', followersController.following);

router.post('/post/reaction/create/:id', isAuth, reactionsController.react);
router.delete('/post/reaction/delete/:id', isAuth, reactionsController.removeReaction);
router.get('/post/reaction/count/:id', reactionsController.reactionCount);
router.get('/post/reaction/user', isAuth, reactionsController.userReactions);
router.get('/post/reaction/:id', reactionsController.postReactions);

router.get('/chat', chatsController.index)
router.get('/chat/my', isAuth, chatsController.myChats)
router.get('/chat/:id', chatsController.show)

router.post('/message/create', isAuth, messagesController.create)
router.put('/message/update/:id', messagesController.update)
router.delete('/message/delete/:id', messagesController.delete)

router.get('/permission', isAuth, isAdmin, permissionsController.index)

module.exports = router;
