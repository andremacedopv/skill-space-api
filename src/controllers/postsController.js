// Imports
const Post = require('../models/post');
const Tag = require('../models/tag')
const User = require('../models/user')
const TagUser = require('../models/tagUser')
const Reaction = require('../models/reaction')
const Follower = require('../models/follower');

// Methods
exports.index = (req, res, next) => {
    Post.findAll({include: Tag})
    .then(posts => {
        res.json({ posts: posts });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    })  
}

exports.feed = async (req, res, next) => {
    try {
        const userId = req.user.id
        const followings = await Follower.findAll({where: {followerId: req.user.id}, attributes: ['followingId']})
        const followingUsers = followings.map(following => following.followingId)
        const tagsUser = await TagUser.findAll({where: {userId: userId}})
        const interests = tagsUser.map(tagUser => tagUser.tagId)
        
        const myPosts = await Post.findAll({include: [
            {model: User, attributes: ['id', 'name'], where: {id: userId}},
        ], where: {
            parentPostId: null,
        }})
        const interestedPosts = await Post.findAll({include: [
            {model: Tag, attributes: ['id'], where: {id: interests}},
        ], where: {
            parentPostId: null,
        }})
        const followingUsersPosts = await Post.findAll({include: [
            {model: User, attributes: ['id', 'name'], where: {id: followingUsers}},
        ], where: {
            parentPostId: null,
        }})

        const totalPosts = interestedPosts.concat(myPosts, followingUsersPosts)
        const postIds = totalPosts.map(post => post.id)

        const posts = await Post.findAll({include: [
            {model: Tag, attributes: ['id', 'name']},
            {model: User, attributes: ['id', 'name']},
            {model: Post, as: 'comments'},
            {model: Reaction, as: 'reacteds', include: [User]}
        ], order: [
            ['createdAt', 'DESC'],
        ], where: {
            id: postIds,
        }})

        res.json({ posts: posts });
    }
    catch(e) {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    }
}

exports.userFeed = async (req, res, next) => {
    try {

        const userId = req.params.id

        const myPosts = await Post.findAll({include: [
            {model: User, attributes: ['id', 'name'], where: {id: userId}},
        ], where: {
            parentPostId: null,
        }})

        const postIds = myPosts.map(post => post.id)

        const posts = await Post.findAll({include: [
            {model: Tag, attributes: ['id', 'name']},
            {model: User, attributes: ['id', 'name']},
            {model: Post, as: 'comments'},
            {model: Reaction, as: 'reacteds', include: [User]}
        ], order: [
            ['createdAt', 'DESC'],
        ], where: {
            id: postIds,
        }})

        res.json({ posts: posts });
    }
    catch(e) {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    }
}

exports.create = async (req, res, next) => {
    try{
        const post = req.body;
        const newPost = await Post.create({
            name: post.name,
            description: post.description,
            userId: req.user.id,
            parentPostId: post.parentPostId
        })

        await newPost.setTags(post.tags)
        res.json({ post: newPost.dataValues });
    }
    catch(e){
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}

exports.update = async (req, res, next) => {
    const updatedPost = req.body;

    try {
        const post = await Post.findByPk(req.params.id)
        if(!post) throw new Error("Post não encontrado")
        post.name = updatedPost.name? updatedPost.name : post.name;
        post.description = updatedPost.description? updatedPost.description : post.description;
        if(updatedStage.requirements) {
            await post.removeTags()
            await post.setTags(updatedPost.tags)
        }
        await post.save()
        res.json({ post: post.dataValues });
    }
    catch(e) {
        console.log(e)      
        res.status(422).json({ error: e.toString() })
    }
}

exports.show = (req, res, next) => {
    Post.findByPk(req.params.id, {include: [
        {model: Tag, attributes: ['id', 'name']},
        {model: User, attributes: ['id', 'name']},
        {model: Reaction, as: 'reacteds', include: [User]},
        {model: Post, as: 'comments', include: [
            {model: User, attributes: ['id', 'name']}, 
            {model: Reaction, as: 'reacteds', include: [User]},
            {model: Post, as: 'comments', include: [
                {model: User, attributes: ['id', 'name']}, 
                {model: Reaction, as: 'reacteds', include: [User]},
                {model: Post, as: 'comments'}, 
            ]}, 
        ]},
    ]})
    .then(post => {
        if(!post) throw new Error("Post não encontrado")
        res.json({ post: post })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.comments = async (req, res, next) => {

    try {
        const post = await Post.findByPk(req.params.id, {include: Tag})
        if(!post) throw new Error("Post não encontrado")

        const comments = await Post.findAll({where: {
            parentPostId: req.params.id
        }})
        
        res.json({ comments: comments })
    }
    catch (e) {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}

exports.delete = (req, res, next) => {
    Post.findByPk(req.params.id)
    .then(post => {
        if(!post) throw new Error("Post não encontrado")
        return post.destroy()
    })
    .then(response => {
        res.json({ message: 'Post deletado com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}