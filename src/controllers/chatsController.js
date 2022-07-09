// Imports
const Message = require('../models/message');

// Methods

exports.newMessage = (req, res, next) => {

    const message = req.body;

    // Chega se existe um chat com todos os remetentes + o user q esta enviando
    // Se existir o tal chat, crie a mensagem e atrele a mensagem a este chat
    // Senão existir, crie o chat, crie os ChatUser e atrele a mensagem ao novo chat

    Message.create({
        description: message.description,
        date: Date.now(),
        userId: req.user.id
    })
    .then(newMessage => {
        res.json({ message: newMessage.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}

exports.deleteMessage = (req, res, next) => {
    Message.findByPk(req.params.id)
    .then(message => {
        if(!message) throw new Error("Mensagem não encontrada")
        return message.destroy()
    })
    .then(response => {
        res.json({ message: 'Mensagem deletado com sucesso' })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
}
