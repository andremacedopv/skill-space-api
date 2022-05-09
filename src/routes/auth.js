const express = require('express')
const { body } = require('express-validator/check')

const router = express.Router();

const User = require('../models/user');

const usersController = require('../controllers/usersController')
const isAuth = require('../middleware/is-auth')
const isAdmin = require('../middleware/is-admin')

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
router.patch('/profile/update', isAuth, usersController.update)
router.get('/user', isAuth, isAdmin, usersController.index)
router.get('/user/:id', isAuth, usersController.show)

module.exports = router;
