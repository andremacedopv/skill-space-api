// Imports
const ActivityType = require('../models/activityType');
const Activity = require('../models/activity');
const ActivityRequirement = require('../models/activityRequirement');
const Category = require('../models/category');
const Event = require('../models/event')
const constants = require('../lib/constants')

// Methods
exports.index = (req, res, next) => {
    Activity.scope('noAssociation').findAll({ 
        include: 
        [
            {model: ActivityType, attributes: ['id', 'name']},
            {model: Event, attributes: ['id', 'name']},
            {model: Category, attributes: ['id', 'name']},
            // {model: Activity, as: 'requirement'}
        ] 
    })
    .then(activities => {
        res.json({ activities: activities });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e })
    })  
}

exports.create = (req, res, next) => {
    const activity = req.body;
    Activity.create({
        name: activity.name,
        description: activity.description,
        categoryId: activity.category,
        activityTypeId: activity.activityType,
        eventId: (activity.activityType == constants.EventTypeId)? activity.event : null,
        mandatory: activity.mandatory
    })
    .then(newActivity => {
        if(activity.requirements != null) {
            const activities = [...new Set(activity.requirements)]
            var requirements = activities.map(id => ({
                activityId: newActivity.id, requirementId: id
            }))
            ActivityRequirement.bulkCreate(requirements)
        }
        return newActivity
    })
    .then(newActivity => {
        res.json({ activity: newActivity.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.update = (req, res, next) => {
    const newActivity = req.body;
    Activity.findByPk(req.params.id)
    .then(activity => {
        if(!activity) throw new Error("Atividade não encontrada")
        activity.name = newActivity.name? newActivity.name : activityat.name;
        activity.description = newActivity.description? newActivity.description : activity.description;
        activity.categoryId = newActivity.category? newActivity.category : activity.categoryId;
        activity.activityTypeId = newActivity.activityType? newActivity.activityType : activity.activityTypeId;
        activity.eventId = newActivity.event? newActivity.event : activity.eventId;
        activity.mandatory = newActivity.mandatory? newActivity.mandatory : activity.mandatory;
        return activity.save()
    })
    .then(response => {
        res.json({ activity: response.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.show = (req, res, next) => {
    Activity.findByPk(req.params.id, { include: 
        [
            {model: ActivityType, attributes: ['id', 'name']},
            {model: Event, attributes: ['id', 'name']},
            {model: Category, attributes: ['id', 'name']},
            // {model: Activity, as: 'requirement'},
            // {model: Activity, as: 'dependents'},
        ] 
    })
    .then(activity => {
        if(!activity) throw new Error("Atividade não encontrada")
        res.json({ activity: activity })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.delete = (req, res, next) => {
    Activity.findByPk(req.params.id)
    .then(activity => {
        if(!activity) throw new Error("Atividade não encontrada")
        return activity.destroy()
    })
    .then(response => {
        res.json({ message: 'Atividade deletada com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.addRequirements = (req, res, next) => {
    const body = req.body
    var requirements = body.activities.map(id => ({
        activityId: req.params.id, requirementId: id
    }))
    return ActivityRequirement.bulkCreate(requirements)
    .then(requirements => {
        res.json({ message: 'Dependências cadastradas com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.addDependents = (req, res, next) => {
    const body = req.body
    var requirements = body.activities.map(id => ({
        requirementId: req.params.id, activityId: id
    }))
    return ActivityRequirement.bulkCreate(requirements)
    .then(requirements => {
        res.json({ message: 'Dependências cadastradas com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.requirements = (req, res, next) => {
    ActivityRequirement.findAll({
        where: {
            activityId: req.params.id
        }
    })
    .then(requirement => {
        res.json({ activityRequirements: requirement })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.dependents = (req, res, next) => {
    ActivityRequirement.findAll({
        where: {
            requirementId: req.params.id
        }
    })
    .then(requirement => {
        res.json({ dependents: requirement })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}
