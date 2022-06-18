// Imports
const Event = require('../models/event');
const EventFeedback = require('../models/eventFeedback');
const InvitedSpeaker = require('../models/invitedSpeaker');

// Methods
exports.index = (req, res, next) => {
    Event.findAll({ include: [EventFeedback, InvitedSpeaker] })
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
    .then((newEvent) => {
        newEvent.setInvitedSpeakers(event.invitedSpeakers)
        return newEvent
    })
    .then(newEvent => {
        res.json({ event: newEvent.dataValues });
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
        newEvent.invitedSpeakers && event.setInvitedSpeakers(newEvent.invitedSpeakers)
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
    Event.findByPk(req.params.id, { include: InvitedSpeaker })
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

exports.createFeedback = async (req, res, next) => {
    
    const feedbackParams = req.body;

    try {
        const event = await Event.findByPk(req.params.id)
        const feedback = await EventFeedback.create({
            description: feedbackParams.description,
            score: feedbackParams.score,
            userId: feedbackParams.userId ? feedbackParams.userId : null,
            eventId: req.params.id
        })
        res.status(201).json({message: "Event Feedback created", feedback: feedback})
    }

    catch (e) {
        console.log(e)
        res.status(422).json({ error: e })
    }
    
}
