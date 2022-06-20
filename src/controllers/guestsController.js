// Imports
const Guest = require('../models/guest');
const User = require('../models/user');

// Methods
exports.update = (req, res, next) => {
    const newGuest = req.body;
    Guest.findOne({
        where: {
            eventId: req.params.event_id,
            userId: req.params.user_id
        }
    })
    .then(guest => {
        guest.organizer = (newGuest.organizer != null)? newGuest.organizer : guest.organizer;
        guest.present = (newGuest.present != null)? newGuest.present : guest.present;
        guest.status = newGuest.status? newGuest.status : guest.status;
        return guest.save()
    })
    .then(response => {
        res.json({ guest: response.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.show = (req, res, next) => {
    Guest.findOne({
        where: {
            eventId: req.params.event_id,
            userId: req.params.user_id
        },
        include: User.scope('minimal')
    })
    .then(guest => {
        res.json({ event: guest })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.delete = (req, res, next) => {
    Guest.findOne({
        where: {
            eventId: req.params.event_id,
            userId: req.params.user_id
        }
    })
    .then(guest => {
        return guest.destroy()
    })
    .then(response => {
        res.json({ message: 'Evento deletado com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.confirmPresence = (req, res, next) => {
    const body = req.body
    Guest.update(
        { present: true },
        {
            where: {
                userId: body.guests,
                eventId: req.params.event_id
            }
        }
    )
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
    res.json({ message: 'Presenças confirmadas com sucesso' })
}
