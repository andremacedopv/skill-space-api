// Imports
const Message = require('../models/message');
const Chat =  require('../models/chat')
const User = require('../models/user');
const ChatUser = require('../models/chatUser');

const { Op } = require("sequelize");

// Methods

exports.create = async (req, res, next) => {

    
    try {
        const message = req.body;
        
        let chat = await Chat.findAll({include: [{
            model: User,
            as: 'users',
            attributes: ['id'],
            where: {
                id: {[Op.or]: req.body.users}
            },
            required: true
        }]})

        res.json({ chat: chat });
    
        // if(!chat) {
        //     chat = await Chat.create()
        //     await chat.setUsers(req.body.users)
        // }
    
        // res.json({ chat: chat });
        // const newMessage = Message.create({
        //     description: message.description,
        //     date: Date.now(),
        //     userId: req.user.id,
        //     chatId: chat.id
        // })
        // res.json({ message: newMessage.dataValues });
    }
    catch(e){
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
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