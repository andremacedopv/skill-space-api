// Imports
const db = require('../services/database')
const sequelize = require('sequelize');

// Model definition
const Chat = db.define('chat', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Chat;
