// Imports
const Post = require('../models/post');

// Methods
exports.index = (req, res, next) => {
    Post.findAll()
    .then(posts => {
        res.json({ posts: posts });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    })  
}

exports.create = (req, res, next) => {
    const post = req.body;
    Post.create({
        name: post.name,
        description: post.description,
        userId: req.user.id,
        parentPostId: post.parentPostId
    })
    .then(newPost => {
        res.json({ post: newPost.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.update = (req, res, next) => {
    const updatedPost = req.body;
    Post.findByPk(req.params.id)
    .then(post => {
        if(!post) throw new Error("Post não encontrado")
        post.name = updatedPost.name? updatedPost.name : post.name;
        post.description = updatedPost.description? updatedPost.description : post.description;
        return post.save()
    })
    .then(response => {
        res.json({ post: response.dataValues });
    })
    .catch(e => {
        console.log(e)      
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.show = (req, res, next) => {
    Post.findByPk(req.params.id)
    .then(post => {
        if(!post) throw new Error("Post não encontrada")
        res.json({ post: post })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
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