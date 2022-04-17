const express = require('express')

const router = express.Router();

const addressesController = require('../controllers/addressesControler')

router.get('/', (req, res, next) => {
    res.json({ message: 'Hello World' });
})

router.get('/addresses', addressesController.index);
router.post('/addresses/create', addressesController.create);

module.exports = router;
