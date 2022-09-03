// Imports
const Stage = require('../models/stage');
const Activity = require('../models/activity')
const ActivityUser = require('../models/activityUser')
const StageUser = require('../models/stageUser')
const User = require('../models/user')

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

exports.myStages = (req, res, next) => {
    const userId = req.user.id
    let stagesArr = []
    let activitiesUserArr = []
    let stagesUserArr = []
    let response = []

    Stage.findAll({
        include: [
            {model: Activity, as: 'activities', attributes: ['id', 'name']},
            {model: Stage, as: 'requirements', attributes: ['id', 'name']},
        ] 
    }).then(stages => {
        stagesArr = stages
        return StageUser.findAll({
            where: {
                userId: userId
            }
        })
    }).then(stageUsers => {
        stagesUserArr = stageUsers
        return ActivityUser.findAll({
            where: {
                userId: userId
            },
            include: [
                {model: Activity, as: 'activity', attributes: ['id', 'name']},
            ]
        })
    }).then(activityUsers => {
        activitiesUserArr = activityUsers
        let overallPercentage = 0, stagesCompleted = 0, stagesStarted = 0, stagesTotal = stagesArr.length

        stagesArr.forEach(stage => {
            let locked = false
            stage.dataValues.percentage = 0
            stage.dataValues.activitiesCompleted = 0
            stage.dataValues.activitiesTotal = stage.dataValues.activities.length
            let stageUser = stagesUserArr.find(stageUser => stageUser.stageId == stage.id)

            if (stageUser) {
                let completed = 0, remaining = 0
                stage.dataValues.stageUser = stageUser

                stage.dataValues.activities?.forEach(activity => {
                    let activityUser = activitiesUserArr.find(activityUser => activityUser.dataValues.activityId == activity.id)

                    if(activityUser) {
                        if (activityUser.dateCompleted != null) completed++
                        else remaining++
                    } else {
                        remaining++
                    }
                })

                stage.dataValues.activitiesCompleted = completed
                if (completed != 0 && remaining == 0) {
                    stage.dataValues.status = 'completed'
                    stagesCompleted++
                    overallPercentage += 1/stagesTotal
                    stage.dataValues.percentage = 100
                } else {
                    stage.dataValues.status = 'incomplete'
                    stagesStarted++
                    overallPercentage += 1/stagesTotal * (completed / (completed + remaining))
                    if(completed != 0) {
                        stage.dataValues.percentage = Math.round(completed / (completed + remaining) * 1000) / 10
                    }
                }
            } else {
                stage.dataValues.status = 'not-started'
            }

            stage.dataValues.requirements?.forEach(requirement => {
                let requirementUser = stagesUserArr.find(requirementUser => requirementUser.stageId == requirement.id)
                if(requirementUser) {
                    if (requirementUser.dateCompleted == null) locked = true
                } else {
                    locked = true
                }
            })
            
            stage.dataValues.locked = locked
            response.push(stage)
        })
        res.json({ 
            stages: response, 
            completed: Math.round(stagesCompleted / (stagesStarted + stagesCompleted) * 1000) / 10,
            started: Math.round((stagesStarted + stagesCompleted) / stagesTotal * 1000) / 10,
            overall: Math.round(overallPercentage * 1000) / 10 })
    }).catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    })
}
