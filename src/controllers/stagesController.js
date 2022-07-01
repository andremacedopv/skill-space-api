// Imports
const Stage = require('../models/stage');
const Activity = require('../models/activity')

// Methods
exports.index = (req, res, next) => {
    Stage.findAll({ 
        include: [
            {model: Activity, as: 'activities', attributes: ['id', 'name']},
            {model: Stage, as: 'requirements', attributes: ['id', 'name']}
        ] 
    })
    .then(stages => {
        res.json({ stages: stages });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    })  
}

exports.create = async (req, res, next) => {
    const stage = req.body;
    
    try {
        const newStage = await Stage.create({
            name: stage.name,
            description: stage.description,
            hoursRequirement: stage.hoursRequirement,
        })
        await newStage.setRequirements(stage.requirements)
        res.json({ stage: newStage.dataValues });
    }
    catch(e) {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}

exports.update = async (req, res, next) => {
    const updatedStage = req.body;

    try {
        const stage = await Stage.findByPk(req.params.id)
        if(!stage) throw new Error("Estágio não encontrado")
        stage.name = updatedStage.name? updatedStage.name : stage.name;
        stage.description = updatedStage.description? updatedStage.description : stage.description;
        stage.hoursRequirement = updatedStage.hoursRequirement? updatedStage.hoursRequirement : stage.hoursRequirement;
        if(updatedStage.requirements) {
            await stage.removeRequirements()
            await stage.setRequirements(updatedStage.requirements)
        }
        await stage.save()
        res.json({ stage: stage.dataValues });
    }
    catch(e) {
        console.log(e)      
        res.status(422).json({ error: e.toString() })
    }
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