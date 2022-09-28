const express = require('express')
const { body } = require('express-validator/check')

const router = express.Router();

const User = require('../models/user');

const usersController = require('../controllers/usersController')
const isAuth = require('../middlewares/is-auth')
const isAdmin = require('../middlewares/is-admin')
const isOwner = require('../middlewares/is-owner')
const hasPermission = require('../middlewares/has-permission')

const multer = require("multer");
const multerConfig = require("../config/multer");

router.post('/signup', [
   body('email')
    .isEmail()
    .withMessage('Must be valid e-mail')
    .custom((value, { req }) => {
        return User.findOne({ where: { email: value } })
            .then(userDoc => {
                if(userDoc) {
                    return Promise.reject('E-mail alredy exists.');
                }
            })
    })
    .normalizeEmail(),
   body('password').trim().isLength({min: 6}),
   body('name').trim().not().isEmpty()
], usersController.signup);

router.post('/login', usersController.login);

router.get('/profile', isAuth, usersController.profile)
router.get('/invitations', isAuth, usersController.invitations)
router.patch('/profile/update/picture', isAuth,  multer(multerConfig).single("file"), usersController.updateProfilePicture)
router.put('/profile/update', isAuth, usersController.update)
router.get('/user', isAuth, isAuth, hasPermission("show_users"), usersController.index)
router.get('/user/:id', isAuth, usersController.show)
router.patch('/user/promote/:id', isAuth, isOwner, usersController.promote)
router.patch('/user/demote/:id', isAuth, isOwner, usersController.demote)
router.patch('/user/activate/:id', isAuth, isAdmin, usersController.activate)
router.patch('/user/permissions/:id', isAuth, isOwner, usersController.updatePermissions)
router.patch('/user/deactivate/:id', isAuth, isAdmin, usersController.deactivate)
router.patch('/user/stages/add', isAuth, hasPermission("modify_users"), usersController.addStage)
router.patch('/user/stages/remove', isAuth, hasPermission("modify_users"), usersController.removeStage)
router.patch('/user/stages/start/:id', isAuth, usersController.startStage)
router.patch('/user/stages/finish/:id', isAuth, usersController.finishStage)

module.exports = router;
