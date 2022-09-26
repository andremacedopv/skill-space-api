// Imports
const Post = require('../models/post');
const Tag = require('../models/tag')
const User = require('../models/user')
const Reaction = require('../models/reaction')

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

exports.feed = (req, res, next) => {
    Post.findAll({include: [
        {model: Tag, attributes: ['id', 'name']},
        {model: User, attributes: ['id', 'name']},
        {model: Post, as: 'comments'},
        {model: Reaction, as: 'reacteds', include: [User]}
    ], order: [
        ['createdAt', 'DESC'],
    ], where: {
        parentPostId: null
    }})
    .then(posts => {
        res.json({ posts: posts });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    })  
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
    Post.findByPk(req.params.id, {include: Tag})
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