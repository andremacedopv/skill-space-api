// Imports
const ActivityType = require('../models/activityType');
const Activity = require('../models/activity');
const ActivityRequirement = require('../models/activityRequirement');
const Category = require('../models/category');
const Event = require('../models/event')
const Post = require('../models/post')
const User = require('../models/user')
const ActivitySubmission = require('../models/activitySubmission')
const ActivityFeedback = require('../models/activityFeedback')
const ActivityUser = require('../models/activityUser')
const { Op } = require("sequelize")
const constants = require('../lib/constants')

// Methods
exports.start = async (req, res, next) => {
    const userReq = req.user

    try {
        const activity = await Activity.findByPk(req.params.id, {
            include: 
                [
                    {model: Activity, as: 'requirements', attributes: ['id', 'name']},
                ] 
        })
        if(!activity) throw new Error("Atividade não encontrada")

        const requirements = activity.requirements
        
        let requirementFail = false

        for await (const item of requirements) {
            const au = await ActivityUser.scope('minimal').findOne({ 
                where: {
                    userId: userReq.id,
                    activityId: item.id,
                    dateCompleted: {
                        [Op.not]: null
                    }
                },
            })
            if (!au) requirementFail = true
        }

        if(requirementFail) {
            throw new Error("You can only start this activity when all the requirements have been completed")   
        }

        await ActivityUser.create({
            userId: userReq.id,
            activityId: req.params.id,
        })
        
        res.json({ message: "Atividade iniciada com sucesso" });
    } catch(err) {
        console.log(err)
        res.status(422).json({ error: err.toString() })
    } 
}

exports.userIndex = (req, res, next) => {
    const userReq = req.user
    const body = req.body

    whereClause = {
        userId: userReq.id
    }
    if (body.status == 'Completed') {
        whereClause = {
            userId: userReq.id,
            dateCompleted: {
                [Op.not]: null
            }
        }
    } else if (body.status == 'Started') {
        whereClause = {
            userId: userReq.id,
            dateCompleted: null
        }
    }

    ActivityUser.scope('minimal').findAll({ 
        where: whereClause,
        include: 
        [
            {model: Activity, attributes: ['id', 'name', 'mandatory']},
            {model: Post, attributes: ['id', 'name']},
            {model: ActivitySubmission, attributes: ['id']},
            {model: ActivityFeedback, attributes: ['id', 'score', 'approved']},
        ] 
    }).then(activities => {
        res.json({ activities: activities });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e })
    })  
}

exports.finish = async (req, res, next) => {
    const activityId = req.params.id
    const userId = req.user.id
    const body = req.body

    try {
        const activityUser = await ActivityUser.findOne({
            where: {
                userId: userId,
                activityId: activityId
            }
        })
        if(!activityUser) throw new Error("Atividade não iniciada")

        const activity = await Activity.findByPk(activityId, {
            include: 
                [
                    {model: ActivityType, attributes: ['name']},
                ] 
        })
        if(!activity) throw new Error("Atividade não encontrada")

        const type = activity.activityType.name
        // Atividades Praticas
        if (type == 'Practical'){
            if (body.description) {
                const submission = await ActivitySubmission.create({
                    description: body.description
                })

                const feedback = await ActivityFeedback.create()

                activityUser.activitySubmissionId = submission.id
                activityUser.activityFeedbackId = feedback.id
            } else {
                const error = new Error('Submit your text to finalize the activity');
                throw error;
            }
        // Atividades Sociais
        } else if (type == 'Social') {
            if (body.postId) {
                const count = Post.count({ where: { id: body.postId } })
                if (count == 0) throw new Error("Post não encontrado")

                activityUser.postId = body.postId
            } else {
                const error = new Error('Submit the post id to finalize the activity');
                throw error;
            }
        // Atividades de Evento
        } else if (type == 'Events') {
            // ? How exactly are the events activity supossed to be finalizes
            const error = new Error('This method cant finalize Events activities');
            throw error;
        } 

        activityUser.dateCompleted = new Date(Date.now()).toISOString();

        await activityUser.save()
        res.json({message: "Activity finalized"})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}

exports.mySubmission = async (req, res, next) => {
    const activityId = req.params.id
    const userId = req.user.id

    try {
        const activityUser = await ActivityUser.findOne({
            where: {
                userId: userId,
                activityId: activityId
            }
        })
        if(!activityUser) throw new Error("Atividade não iniciada")

        const submission = await ActivitySubmission.findByPk(activityUser.activitySubmissionId)
        if(!submission) throw new Error("Submissão não encontrada")

        res.json({submission: submission})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}

exports.userSubmission = async (req, res, next) => {
    const activityId = req.params.act_id
    const userId = req.params.user_id

    try {
        const activityUser = await ActivityUser.findOne({
            where: {
                userId: userId,
                activityId: activityId
            }
        })
        if(!activityUser) throw new Error("Atividade não iniciada")

        const submission = await ActivitySubmission.findByPk(activityUser.activitySubmissionId)
        if(!submission) throw new Error("Submissão não encontrada")

        res.json({submission: submission})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}

exports.editSubmission = async (req, res, next) => {
    const activityId = req.params.id
    const userId = req.user.id
    const body = req.body

    try {
        const activityUser = await ActivityUser.findOne({
            where: {
                userId: userId,
                activityId: activityId
            }
        })
        if(!activityUser) throw new Error("Atividade não iniciada")

        const submission = await ActivitySubmission.findByPk(activityUser.activitySubmissionId)
        if(!submission) throw new Error("Submissão não encontrada")

        submission.description = body.description? body.description : submission.description;

        await submission.save()
        res.json({message: "Submissão atualizada com sucesso"})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}

exports.indexSubmissions = async (req, res, next) => {
    const body = req.body

    whereClause = {}
    if (body.status == 'Completed') {
        whereClause.dateCompleted = { [Op.not]: null }
    } else if (body.status == 'Started') {
        whereClause.dateCompleted = null
    }
    if (body.activity) {
        whereClause.activityId = body.activity
    }
    if (body.user) {
        whereClause.userId = body.user
    }

    try {
        const AUs = await ActivityUser.scope('minimal').findAll({ 
            where: whereClause,
            include: 
            [
                {model: Activity, attributes: ['id', 'name', 'mandatory'], where: {
                    'activityTypeId': 2
                }},
                {model: User, attributes: ['id', 'name', 'is_active']},
                {model: Post, attributes: ['id', 'name']},
                {model: ActivitySubmission, attributes: ['id', 'description']},
                {model: ActivityFeedback, attributes: ['id', 'score', 'approved']},
            ] 
        })

        res.json({submissions: AUs})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}

exports.giveFeedback = async (req, res, next) => {
    const activityId = req.params.act_id
    const submission_userId = req.params.user_id
    const feedback_userId = req.user.id
    const body = req.body

    try {
        const activityUser = await ActivityUser.findOne({
            where: {
                userId: submission_userId,
                activityId: activityId
            }
        })
        if(!activityUser) throw new Error("Atividade não iniciada")

        if(activityUser.dateCompleted == null) throw new Error("Atividade não finalizada")

        const feedback = await ActivityFeedback.findByPk(activityUser.activityFeedbackId)
        if(!feedback) {
            feedback = await ActivityFeedback.create()
        }

        if(feedback.userId != null) {
            throw new Error("Feedback já criado")
        }

        feedback.userId = feedback_userId
        feedback.description = body.description
        feedback.score = body.score
        feedback.approved = body.approved

        await feedback.save()
        res.json({message: "Feedback enviado"})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}

exports.editFeedback = async (req, res, next) => {
    const activityId = req.params.act_id
    const submission_userId = req.params.user_id
    const feedback_userId = req.user.id
    const body = req.body

    try {
        const activityUser = await ActivityUser.findOne({
            where: {
                userId: submission_userId,
                activityId: activityId
            }
        })
        if(!activityUser) throw new Error("Atividade não iniciada")

        if(activityUser.dateCompleted == null) throw new Error("Atividade não finalizada")

        const feedback = await ActivityFeedback.findByPk(activityUser.activityFeedbackId)
        if(!feedback) {
            throw new Error("Feedback não encontrado")
        }

        if(feedback.userId != feedback_userId) {
            throw new Error("Feedback só pode ser atualizado pela pesso que o fez")
        }        

        feedback.userId = feedback_userId
        feedback.description = body.description? body.description : feedback.description
        feedback.score = body.score? body.score : feedback.score
        feedback.approved = body.approved? body.approved : feedback.approved

        await feedback.save()
        res.json({message: "Feedback Atualizado"})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}

exports.pendingFeedbacks = async (req, res, next) => {
    try {
        const AUs = await ActivityUser.scope('minimal').findAll({ 
            include: 
            [
                {model: Activity, attributes: ['id', 'name', 'mandatory'], where: {
                    'activityTypeId': 2
                }},
                {model: User, attributes: ['id', 'name', 'is_active']},
                {model: Post, attributes: ['id', 'name']},
                {model: ActivitySubmission, attributes: ['id', 'description']},
                {model: ActivityFeedback, where: {
                    'userId': null
                }},
            ] 
        })

        res.json({submissions: AUs})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}
