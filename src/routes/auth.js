const express = require('express')
const { body } = require('express-validator/check')

const router = express.Router();

const User = require('../models/user');

const usersController = require('../controllers/usersController')
const isAuth = require('../middlewares/is-auth')
const isAdmin = require('../middlewares/is-admin')
const isOwner = require('../middlewares/is-owner')

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
router.put('/profile/update', isAuth, usersController.update)
router.get('/user', isAuth, isAdmin, usersController.index)
router.get('/user/:id', isAuth, usersController.show)
router.patch('/user/promote/:id', isAuth, isOwner, usersController.promote)
router.patch('/user/demote/:id', isAuth, isOwner, usersController.demote)
router.patch('/user/activate/:id', isAuth, isAdmin, usersController.activate)
router.patch('/user/deactivate/:id', isAuth, isAdmin, usersController.deactivate)

module.exports = router;
