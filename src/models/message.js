// Imports
const db = require('../services/database')
const sequelize = require('sequelize');

// Model definition
const Message = db.define('message', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: sequelize.TEXT,
    allowNull: false,
  },
  date: {
    type: sequelize.DATE,
    allowNull: false
  },
  userId: {
    type: sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  }
});

module.exports = Message;
