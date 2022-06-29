// Imports
const User = require('../models/user');
const Follower = require('../models/follower')

exports.follow = async (req, res, next) => {
    try{
        const count = await User.count({ where: { id: req.params.id } })
        if (count == 0) throw new Error("Usuário não encontrado")
        const follow = await Follower.findOne({
            where: {
                followerId: req.user.id,
                followingId: req.params.id
            }
        })
        if(!follow) {
            await Follower.create({
                followerId: req.user.id,
                followingId: req.params.id
            })
            res.json({ message: "Usuário seguido com sucesso" });
        } else {
            follow.destroy()
            res.json({ message: "Usuário não mais seguido" })
        }
    }
    catch(e){
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}

exports.following = (req, res, next) => {
    User.scope('minimal').findAll({
        include: [{
            model: User,
            as: 'followings',
            where: {
                id: req.params.id
            },
            attributes: [],
            required: true
        }]
    })
    .then(t => {
        res.json({ following: t })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.followers = (req, res, next) => {
    User.scope('minimal').findAll({
        include: [{
            model: User,
            as: 'follows',
            where: {
                id: req.params.id
            },
            attributes: [],
            required: true
        }]
    })
    .then(t => {
        res.json({ followers: t })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.followerCount = (req, res, next) => {
    User.count({
        include: [{
            model: User,
            as: 'follows',
            where: {
                id: req.params.id
            },
            attributes: [],
            required: true
        }]
    })
    .then(t => {
        res.json({ followers: t })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.followingCount = (req, res, next) => {
    User.count({
        include: [{
            model: User,
            as: 'followings',
            where: {
                id: req.params.id
            },
            attributes: [],
            required: true
        }]
    })
    .then(t => {
        res.json({ followers: t })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}
