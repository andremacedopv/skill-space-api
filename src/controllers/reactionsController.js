// Imports
const User = require('../models/user');
const Post = require('../models/post')
const Reaction = require('../models/reaction')

exports.react = async (req, res, next) => {
    try{
        const count = Post.count({ where: { id: req.params.id } })
        if (count == 0) throw new Error("Tag não encontrada")

        const reaction = req.body

        await Reaction.upsert({
            postId: req.params.id,
            userId: req.user.id,
            status: reaction.status
        })
        res.json({ message: "Post reagido com sucesso" });
    }
    catch(e){
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}

exports.removeReaction = (req, res, next) => {
    Reaction.findOne({
        where: {
            postId: req.params.id,
            userId: req.user.id
        }
    })
    .then(reaction => {
        if(!reaction) Error("Erro ao remover reação")
        reaction.destroy()
        res.json({ message: "Operação realizada com sucesso" })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.userReactions = (req, res, next) => {
    Reaction.findAll({
        include: [{
            model: User,
            where: {
                id: req.user.id
            },
            attributes: [],
            required: true
        },
        {
            model: Post,
            attributes: ['id', 'name'],
        }],
        attributes: ['status'],
    })
    .then(t => {
        res.json({ posts: t })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.postReactions = (req, res, next) => {
    Reaction.findAll({
        include: [{
            model: Post,
            where: {
                id: req.params.id
            },
            attributes: [],
            required: true
        },
        {
            model: User,
            attributes: ['id', 'name', 'admin'],
        }],
        attributes: ['status'],
    })
    .then(t => {
        res.json({ users: t })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.reactionCount = async (req, res, next) => {
    try {
        const total = await Reaction.count({
            where: {
                postId: req.params.id
            },
        })
        const groups = await Reaction.count({
            where: {
                postId: req.params.id
            },
            attributes: [
                'status',
            ],
            group: 'status',
            raw: true,
            logging: true
        })
        res.json({ reactions: groups, total: total })
    } catch (e){
        console.log(e)
        res.status(422).json({ error: e })
    }
}
