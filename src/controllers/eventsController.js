// Imports
const Event = require('../models/event');
const Guest = require('../models/guest')
const EventFeedback = require('../models/eventFeedback');
const InvitedSpeaker = require('../models/invitedSpeaker');

// Methods
exports.index = (req, res, next) => {
    Event.findAll({ include: EventFeedback })
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
        const invites = event.guests
        if(invites != null) {
            let guests = []
            invites.forEach((user, i) => {
                Guest.create({
                    organizer: false,
                    present: null,
                    status: 'Invitation Pending',
                    eventId: newEvent.id,
                    userId: user
                }).then(guest => {
                    guests.push(guest)
                })
                .catch(e => {
                    console.log(e)
                    res.status(422).json({ error: e })
                }) 
            }) 
        }
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

exports.setInvites = (req, res, next) => {
    const invites = req.body
    Event.findByPk(req.params.id)
    .then(event => {
        let guests = []
        invites.users.forEach((user, i) => {
            Guest.create({
                organizer: false,
                present: false,
                status: 'Invitation Pending',
                eventId: event.id,
                userId: user
            }).then(guest => {
                guests.push(guest)
            })
            .catch(e => {
                console.log(e)
                res.status(422).json({ error: e })
            }) 
        }) 
        return guests
    })
    .then(event => {
        res.json({ message: 'Convites registrados com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.invites = (req, res, next) => {
    Event.findByPk(req.params.id, { include: Guest })
    .then(event => {
      res.json({invitations: event.guests})
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({error: err})
    })
}

exports.createFeedback = async (req, res, next) => {
    
    const feedbackParams = req.body;

    try {
        await Event.findByPk(req.params.id)
        const existingFeedback = await EventFeedback.findOne({ where: { userId: req.user.id, eventId: req.params.id } })

        if(existingFeedback) {
            const error = new Error("Can't create more than one feedback per user")
            throw error
        }

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
