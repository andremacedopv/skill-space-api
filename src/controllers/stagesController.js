// Imports
const Stage = require('../models/stage');

// Methods
exports.index = (req, res, next) => {
    Stage.findAll()
    .then(stages => {
        res.json({ stages: stages });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    })  
}

exports.create = (req, res, next) => {
    const stage = req.body;
    Stage.create({
        name: stage.name,
        description: stage.description,
        hoursRequirement: stage.hoursRequirement,
    })
    .then(newStage => {
        res.json({ stage: newStage.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.update = (req, res, next) => {
    const updatedStage = req.body;
    Stage.findByPk(req.params.id)
    .then(stage => {
        if(!stage) throw new Error("Estágio não encontrado")
        stage.name = updatedStage.name? updatedStage.name : stage.name;
        stage.description = updatedStage.description? updatedStage.description : stage.description;
        stage.hoursRequirement = updatedStage.hoursRequirement? updatedStage.hoursRequirement : stage.hoursRequirement;
        return stage.save()
    })
    .then(response => {
        res.json({ stage: response.dataValues });
    })
    .catch(e => {
        console.log(e)      
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.show = (req, res, next) => {
    Stage.findByPk(req.params.id)
    .then(stage => {
        if(!stage) throw new Error("Estágio não encontrado")
        res.json({ stage: stage })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.delete = (req, res, next) => {
    Stage.findByPk(req.params.id)
    .then(stage => {
        if(!stage) throw new Error("Estágio não encontrado")
        return stage.destroy()
    })
    .then(response => {
        res.json({ message: 'Estágio deletado com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}