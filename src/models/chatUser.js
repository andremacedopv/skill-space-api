// Imports
const db = require('../services/database')
const sequelize = require('sequelize');

// Model definition
const ChatUser = db.define('chat', {
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
  },
  createdAt: {
    allowNull: false,
    type: sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: sequelize.DATE
  }
});

module.exports = ChatUser;
