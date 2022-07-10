// Imports
const Message = require('../models/message');
const Chat =  require('../models/chat')
const User = require('../models/user');
const ChatUser = require('../models/chatUser');

const { Op } = require("sequelize");

// Methods

exports.create = async (req, res, next) => {

    try {
        
        let users = req.body.users
        const message = req.body;
        
        // Garantindo que o usuário logado está no array de usuários
        users = users.filter(function(e) { return e !== req.user.id })
        users.push(req.user.id)
        
        // Buscando todos os chats que incluam os usuários enviados
        const chats = await Chat.findAll({
            include: [{
                model: User,
                as: 'users',
                attributes: ['id'],
                where: {
                    id: {[Op.or]: req.body.users}
                },
                required: true
            }]
        })

        // Filtrando para pegar apenas o chat q possuem ao mesmo tempo todo os n usuários participantes
        let chat
        chats.forEach(c => {
            if(c.users.length === users.length ) chat = c
        });

        if(!chat) {
            chat = await Chat.create()
            await chat.setUsers(req.body.users)
        }
        
        res.json({ chat: chat });
        
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