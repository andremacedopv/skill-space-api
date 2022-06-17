// Imports
const db = require('../services/database')
const sequelize = require('sequelize');

// Model definition
const EventFeedback = db.define('eventFeedback', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'SET NULL',
  },
  eventId: {
    type: Sequelize.INTEGER,
    references: { model: 'events', key: 'id' },
    onDelete: 'cascade',
  }
});

module.exports = EventFeedback;
