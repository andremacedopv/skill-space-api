const express = require('express')

const router = express.Router();

const addressesController = require('../controllers/addressesControler')

router.get('/', (req, res, next) => {
    res.json({ message: 'Hello World' });
})

router.get('/addresses', addressesController.index);
router.get('/addresses/:id', addressesController.show);
router.post('/addresses/create', addressesController.create);
router.patch('/addresses/update/:id', addressesController.update);
router.delete('/addresses/delete/:id', addressesController.delete);

module.exports = router;
