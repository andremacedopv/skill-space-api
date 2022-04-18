const express = require('express')

const router = express.Router();

const eventsController = require('../controllers/eventsController')

router.get('/', (req, res, next) => {
    res.json({ message: 'Hello World' });
})

router.post('/event/create', eventsController.create);
router.put('/event/update/:id', eventsController.update);
router.delete('/event/delete/:id', eventsController.delete);
router.get('/event/:id', eventsController.show);
router.get('/event', eventsController.index);

module.exports = router;
