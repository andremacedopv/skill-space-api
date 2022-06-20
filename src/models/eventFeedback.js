// Imports
const db = require('../services/database')
const sequelize = require('sequelize');

// Model definition
const EventFeedback = db.define('eventFeedback', {
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
    onDelete: 'cascade',
    primaryKey: true
  },
  eventId: {
    type: sequelize.INTEGER,
    references: { model: 'events', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true
  },
  anonymous: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    validate: { isBoolean: true }
  }
});

module.exports = EventFeedback;
