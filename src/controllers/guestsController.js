// Imports
const Guest = require('../models/guest');
const User = require('../models/user');

// Methods
exports.update = (req, res, next) => {
    const newGuest = req.body;
    Guest.findByPk(req.params.id)
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
    Guest.findByPk(req.params.id, { include: User.scope('minimal') })
    .then(guest => {
        res.json({ event: guest })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.delete = (req, res, next) => {
    Guest.findByPk(req.params.id)
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
    let guests = []
    Guest.update(
        { present: true },
        {
            where: {
                id: body.guests
            }
        }
    )
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
    res.json({ message: 'Presenças confirmadas com sucesso' })
}
