// Imports
const Event = require('../models/event');
const Guest = require('../models/guest')
const EventFeedback = require('../models/eventFeedback');
const InvitedSpeaker = require('../models/invitedSpeaker');

// Methods
exports.index = (req, res, next) => {
    Event.findAll({ include: [
        {model: InvitedSpeaker, attributes: ['name']},
    ],
    order: [
        ['date', 'DESC'],
        ['name', 'ASC'],
    ]})
    .then(events => {
        res.json({ events: events });
    })
    .catch(e => {
        res.status(500).json({ error: e.toString() })
    })  
}

exports.create = async (req, res, next) => {
    const event = req.body;

    try {
        newEvent = await Event.create({
            name: event.name,
            description: event.description,
            date: event.date,
            remote: event.remote,
            link: event.link
        })
        await newEvent.setInvitedSpeakers(event.invitedSpeakers)
        if(event.guests != null) {
            const invites = [...new Set(event.guests)]
            var guests = invites.map(u => ({
                userId: u, eventId: newEvent.id
            }))
            await Guest.bulkCreate(guests)
        }
        res.json({ event: newEvent.dataValues });
    }
    catch(e) {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}

exports.update = (req, res, next) => {
    const newEvent = req.body;
    Event.findByPk(req.params.id)
    .then(event => {
        if(!event) throw new Error("Evento não encontrado")

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
        
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.show = (req, res, next) => {
    Event.findByPk(req.params.id, { include: InvitedSpeaker })
    .then(event => {
        if(!event) throw new Error("Evento não encontrado")
        res.json({ event: event })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.delete = (req, res, next) => {
    Event.findByPk(req.params.id)
    .then(event => {
        if(!event) throw new Error("Evento não encontrado")
        return event.destroy()
    })
    .then(response => {
        res.json({ message: 'Evento deletado com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.setInvites = (req, res, next) => {
    const invites = req.body
    Event.findByPk(req.params.id)
    .then(event => {
        if(!event) throw new Error("Evento não encontrado")

        var guests = invites.users.map(u => ({
            userId: u, eventId: event.id
        }))
        return Guest.bulkCreate(guests)
    })
    .then(event => {
        res.json({ message: 'Convites registrados com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.invites = (req, res, next) => {
    Event.findByPk(req.params.id, { include: Guest })
    .then(event => {
      res.json({invitations: event.guests})
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({error: err.toString()})
    })
}

exports.createFeedback = async (req, res, next) => {
    
    const feedbackParams = req.body;

    try {
        await Event.findByPk(req.params.id)

        const feedback = await EventFeedback.create({
            description: feedbackParams.description,
            score: feedbackParams.score,
            anonymous: feedbackParams.anonymous,
            userId: req.user.id,
            eventId: req.params.id
        })
        res.status(201).json({message: "Event Feedback created", feedback: feedback})
    }

    catch (e) {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}

exports.feedbacks = async (req, res, next) => {
    try {
        const event = await Event.findByPk(req.params.id, { include: EventFeedback })
        res.status(200).json({feedbacks: event.eventFeedbacks})
    }

    catch (e) {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}
