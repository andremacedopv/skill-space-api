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
    type: sequelize.TEXT,
    allowNull: false
  },
  score: {
    type: sequelize.INTEGER,
    allowNull: false,
    validate: { isInt: true }
  },
  userId: {
    type: sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'SET NULL',
  },
  eventId: {
    type: sequelize.INTEGER,
    references: { model: 'events', key: 'id' },
    onDelete: 'cascade',
  },
  anonymous: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    validate: { isBoolean: true }
  }
});

module.exports = EventFeedback;
