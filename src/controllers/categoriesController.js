// Imports
const Category = require('../models/category');
const Activity = require('../models/activity')

// Methods
exports.index = (req, res, next) => {
    Category.findAll()
    .then(category => {
        res.json({ categories: category });
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: e })
    })  
}

exports.create = (req, res, next) => {
    const category = req.body;
    Category.create({
        name: category.name,
        description: category.description,
    })
    .then(newCategory => {
        res.json({ category: newCategory.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.update = (req, res, next) => {
    const newCategory = req.body;
    Category.findByPk(req.params.id)
    .then(category => {
        if(!category) throw new Error("Tipo de atividade não encontrada")
        category.name = newCategory.name? newCategory.name : category.name;
        category.description = newCategory.description? newCategory.description : category.description;
        return category.save()
    })
    .then(response => {
        res.json({ category: response.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.show = (req, res, next) => {
    Category.findByPk(req.params.id, { include: Activity })
    .then(category => {
        if(!category) throw new Error("Tipo de atividade não encontrada")
        res.json({ category: category })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.delete = (req, res, next) => {
    Category.findByPk(req.params.id)
    .then(category => {
        if(!category) throw new Error("Tipo de atividade não encontrada")
        return category.destroy()
    })
    .then(response => {
        res.json({ message: 'Tipo de Atividade deletado com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}
