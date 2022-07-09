// Imports
const Message = require('../models/message');
const Chat =  require('../models/chat')
const User = require('../models/user')

// Methods

exports.show = (req, res, next) => {
    Chat.findByPk(req.params.id, { include: [Message, User.scope('minimal')] })
    .then(chat => {
        if(!chat) throw new Error("Chat não encontrado")
        res.json({ chat: chat })
    })
    .catch(e => {
        console.log(e)
        res.status(422).json({ error: e.toString() })
    }) 
}

exports.index = async (req, res, next) => {
    try {
        const chats = await Chat.findAll( {include: User.scope('minimal')} )
        res.json({ chats: chats });
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ error: e.toString() })
    }
}
