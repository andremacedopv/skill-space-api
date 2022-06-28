// Imports
const Tag = require('../models/tag');
const TagUser = require('../models/tagUser');
const User = require('../models/user')

// Methods
exports.index = (req, res, next) => {
    Tag.findAll()
    .then(tags => {
        res.json({ tags: tags });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    })  
}

exports.create = (req, res, next) => {
    const tag = req.body;
    Tag.create({
        name: tag.name
    })
    .then(newTag => {
        res.json({ tag: newTag.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.update = (req, res, next) => {
    const updatedTag = req.body;
    Tag.findByPk(req.params.id)
    .then(tag => {
        if(!tag) throw new Error("Tag não encontrada")
        tag.name = updatedTag.name? updatedTag.name : tag.name;
        return tag.save()
    })
    .then(response => {
        res.json({ tag: response.dataValues });
    })
    .catch(e => {
        console.log(e)      
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.show = (req, res, next) => {
    Tag.findByPk(req.params.id)
    .then(tag => {
        if(!tag) throw new Error("Tag não encontrada")
        res.json({ tag: tag })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.delete = (req, res, next) => {
    Tag.findByPk(req.params.id)
    .then(tag => {
        if(!tag) throw new Error("Tag não encontrada")
        return tag.destroy()
    })
    .then(response => {
        res.json({ message: 'Tag deletada com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.follow = async (req, res, next) => {
    try{
        await TagUser.create({
            userId: req.user.id,
            tagId: req.params.id
        })
        res.json({ message: "Tag seguida com sucesso" });
    }
    catch(e){
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}
exports.toggleFollow = async (req, res, next) => {
    try{
        const tagUser = await TagUser.findOne({
            where: {
                tagId: req.params.id,
                userId: req.user.id
            }
        })
        if(!tagUser) {
            await TagUser.create({
                userId: req.user.id,
                tagId: req.params.id
            })
            res.json({ message: "Tag seguida com sucesso" });
        } else {
            tagUser.destroy()
            res.json({ message: "Tag não mais seguida" })
        }
    }
    catch(e){
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}

exports.unfollow = (req, res, next) => {
    TagUser.findOne({
        where: {
            tagId: req.params.id,
            userId: req.user.id
        }
    })
    .then(tagUser => {
        if(!tagUser) Error("Tag não seguida")
        tagUser.destroy()
        res.json({ message: "Operação realizada com sucesso" })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.followedTags = (req, res, next) => {
    Tag.scope('noTime').findAll({
        include: [{
            model: User,
            where: {
                id: req.user.id
            },
            attributes: [],
            required: true
        }]
    })
    .then(t => {
        res.json({ tags: t })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}