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
                    id: {[Op.or]: users}
                },
                required: true
            }]
        })

        // Filtrando para pegar apenas o chat q possuem ao mesmo tempo todo os n usuários participantes
        let chat
        chats.forEach(c => {
            if(c.users.length === users.length ) {
                chat = c
            }
        });

        // Criando um novo chat caso nunca essa seja a primeira mensagem da conversa
        if(!chat) {
            chat = await Chat.create()
            await chat.setUsers(users)
        }
        
        const newMessage = await Message.create({
            description: message.description,
            date: Date.now(),
            userId: req.user.id,
            chatId: chat.id
        })
        res.json({ message: newMessage.dataValues });
    }
    catch(e){
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }
}

exports.update = (req, res, next) => {
    const newMessage = req.body;
    Message.findByPk(req.params.id)
    .then(message => {
        if(!message) throw new Error("Mensagem não encontrada")
        message.description = newMessage.description
        return category.save()
    })
    .then(response => {
        res.json({ message: response.dataValues });
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e })
    }) 
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