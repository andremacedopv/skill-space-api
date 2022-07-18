// Imports
const Permission = require('../models/permission');

// Methods

exports.index = async (req, res, next) => {
  Permission.findAll()
    .then(permissions => {
        res.json({ permissions: permissions });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    }) 
}