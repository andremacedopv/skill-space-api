// Imports
const Event = require('../models/event');

// Methods
exports.index = (req, res, next) => {
    Event.findAll()
    .then(events => {
        res.json({ events: events });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e })
    })  
}

exports.create = (req, res, next) => {
    const event = req.body;
    Event.create({
        name: event.name,
        description: event.description,
        date: event.date,
        remote: event.remote,
        link: event.link
    })
    .then(event => {
        res.json({ event: event.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.update = (req, res, next) => {
    const newEvent = req.body;
    Event.findByPk(req.params.id)
    .then(event => {
        event.name = newEvent.name? newEvent.name : event.name;
        event.description = newEvent.description? newEvent.description : event.description;
        event.date = newEvent.date? newEvent.date : event.date;
        event.remote = newEvent.remote? newEvent.remote : event.remote;
        event.link = newEvent.link? newEvent.link : event.link;
        return event.save()
    })
    .then(response => {
        res.json({ event: response.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.show = (req, res, next) => {
    Event.findByPk(req.params.id)
    .then(event => {
        res.json({ event: event })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.delete = (req, res, next) => {
    Event.findByPk(req.params.id)
    .then(event => {
        return event.destroy()
    })
    .then(response => {
        res.json({ message: 'Evento deletado com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}
