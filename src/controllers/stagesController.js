// Imports
const Stage = require('../models/stage');
const Activity = require('../models/activity')
const ActivityUser = require('../models/activityUser')
const ActivitySubmission = require('../models/activitySubmission')
const ActivityFeedback = require('../models/activityFeedback')
const StageUser = require('../models/stageUser')
const ActivityType = require('../models/activityType')
const Category = require('../models/category');
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

exports.startStage = (req, res, next) => {
    const userId = req.user.id
    const stageId = req.params.id

    StageUser.create({
        userId: userId,
        stageId: stageId
    }).then(stageUser => {
        res.json({ stageUser: stageUser })
    }).catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    })
}

exports.finishStage = (req, res, next) => {
    const userId = req.user.id
    const stageId = req.params.id

    StageUser.findOne({
        where: {
            userId: userId,
            stageId: stageId
        }
    }).then(stageUser => {
        stageUser.dateCompleted = new Date()
        return stageUser.save()
    }).then(stageUser => {
        res.json({ stageUser: stageUser })
    }).catch(e => {
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
                    overallPercentage += ((completed + remaining) == 0? 0 : 1/stagesTotal * (completed / (completed + remaining)))
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
            overall: Math.round(overallPercentage * 1000) / 10 
        })
    }).catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    })
}

exports.myStageActivities = (req, res, next) => {
    const userId = req.user.id
    const stageId = req.params.id
    let stage = {}
    let stageUserArr = []
    let response = {}

    Stage.findByPk(stageId, {
        include: [
            {model: Activity, as: 'activities', include: [
                { model: Activity, as: 'requirements', include: {model: ActivityUser} },
                { model: ActivityUser, include: [
                    {model: ActivitySubmission},
                    {model: ActivityFeedback},
                ]},
                {model: ActivityType},
                {model: Category},
            ]},
            {model: StageUser},
            {model: Stage, as: 'requirements', attributes: ['id', 'name']},
        ] 
    }).then(retrivedStage => {
        stage = retrivedStage
        let requirementsIds = stage.requirements.map(a => a.id);
        return StageUser.findAll({
            where: {
                userId: userId,
                stageId: { in: requirementsIds }
            }
        })
    }).then(retrievedStageUser => {
        stageUserArr = retrievedStageUser

        // Get stage status
        if(stage.stageUsers.length == 0) {
            stage.dataValues.status = 'not-started'
        } else if(stage.stageUsers[0].dateCompleted == null) {
            stage.dataValues.status = 'incomplete'
        } else {
            stage.dataValues.status = 'completed'
        }

        // Check if blocked
        let locked = false
        if (stage.requirements.length > 0) {
            if(stageUserArr.length != 0) {
                stageUserArr.map(stageUser => {
                    if(stageUser.dateCompleted == null) {
                        locked = true
                    }
                })    
            }

            if(stageUserArr.length != stage.requirements.length) {
                locked = true
            }
        }
        stage.dataValues.locked = locked

        let completed = 0, started = 0, overallPercentage = 0
        let total = stage.activities.length
        stage.activities.map((activity, i) => {    
            stage.dataValues.activities[i].dataValues.locked = false

            if (activity.activityUsers.length != 0 && activity.activityUsers[0].dateCompleted != null) {
                completed++
                overallPercentage += 1/total
                stage.dataValues.activities[i].dataValues.status = 'completed'

                if (activity.activityType.name = "Practical") {
                    if (activity.activityUsers[0]?.activityFeedback?.userId == null) {
                        stage.dataValues.activities[i].dataValues.status = 'pending'
                    }
                }
            } else if (activity.activityUsers.length != 0) {
                started++
                overallPercentage += 0.5/total
                stage.dataValues.activities[i].dataValues.status = 'started'
            } else {
                stage.dataValues.activities[i].dataValues.status = 'not-started'

                activity.requirements.forEach(requirement => {
                    if(requirement.activityUsers.length == 0) {
                        stage.dataValues.activities[i].dataValues.locked = true
                    }
                })
            }
        })
        res.json({ 
            stage: stage,
            completed: completed === 0? 0 : Math.round(completed / (started + completed) * 1000) / 10,
            started: (started + completed) === 0? 0 : Math.round((started + completed) / total * 1000) / 10,
            overall: overallPercentage === 0? 0 : Math.round(overallPercentage * 1000) / 10 
        })
    }).catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    })
}
