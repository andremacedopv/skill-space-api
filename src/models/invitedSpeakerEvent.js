const sequelize = require('sequelize')
const db = require('../services/database')

const invitedSpeakerEvent = db.define('invitedSpeakerEvent', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  eventId: {
    type: sequelize.INTEGER,
    references: { model: 'events', key: 'id' },
    onDelete: 'CASCADE',
  },
  invitedSpeakerId: {
    type: sequelize.INTEGER,
    references: { model: 'invitedSpeakers', key: 'id' },
    onDelete: 'CASCADE',
  }
})

module.exports = invitedSpeakerEvent