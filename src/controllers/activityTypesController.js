// Imports
const ActivityType = require('../models/activityType');
const Activity = require('../models/activity')

// Methods
exports.index = (req, res, next) => {
    ActivityType.findAll()
    .then(at => {
        res.json({ activityTypes: at });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e })
    })  
}

exports.create = (req, res, next) => {
    const at = req.body;
    ActivityType.create({
        name: at.name,
        description: at.description,
    })
    .then(newAT => {
        res.json({ activityType: newAT.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.update = (req, res, next) => {
    const newAT = req.body;
    ActivityType.findByPk(req.params.id)
    .then(at => {
        if(!at) throw new Error("Tipo de atividade não encontrada")
        at.name = newAT.name? newAT.name : at.name;
        at.description = newAT.description? newAT.description : at.description;
        return at.save()
    })
    .then(response => {
        res.json({ activityType: response.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.show = (req, res, next) => {
    ActivityType.findByPk(req.params.id, { include: Activity })
    .then(at => {
        if(!at) throw new Error("Tipo de atividade não encontrada")
        res.json({ activityType: at })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.delete = (req, res, next) => {
    ActivityType.findByPk(req.params.id)
    .then(at => {
        if(!at) throw new Error("Tipo de atividade não encontrada")
        return at.destroy()
    })
    .then(response => {
        res.json({ message: 'Tipo de Atividade deletado com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}
