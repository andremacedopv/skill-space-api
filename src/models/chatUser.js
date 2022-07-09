// Imports
const db = require('../services/database')
const sequelize = require('sequelize');

// Model definition
const ChatUser = db.define('chatUser', {
  chatId: {
    type: sequelize.INTEGER,
    references: { model: 'chats', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  }
});

module.exports = ChatUser;
