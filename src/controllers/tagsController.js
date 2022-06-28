// Imports
const Tag = require('../models/tag');

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