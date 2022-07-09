// Imports
const Message = require('../models/message');
const Chat =  require('../models/chat')

// Methods

exports.create = async (req, res, next) => {

    const message = req.body;

    // Checa se existe um chat com todos os remetentes + o user q esta enviando
    
    const chat = await Chat.create()
    await chat.setUsers([1,2])
    res.json({ chat: chat });

    // console.log("ka")

    // Se existir o tal chat, crie a mensagem e atrele a mensagem a este chat
    // Senão existir, crie o chat, crie os ChatUser e atrele a mensagem ao novo chat

    // try {
    //     const newMessage = Message.create({
    //         description: message.description,
    //         date: Date.now(),
    //         userId: req.user.id
    //     })
    //     res.json({ message: newMessage.dataValues });
    // }
    // catch(e){
    //     console.log(e)
    //     res.status(422).json({ error: e.toString() })
    // }
}

exports.update = (req, res, next) => {
}

exports.delete = (req, res, next) => {
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
        res.status(422).json({ error: e.toString() })
    }) 
}