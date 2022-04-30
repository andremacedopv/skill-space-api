const sequelize = require('sequelize')
const db = require('../services/database');
const Event = require('./event');
const InvitedSpeakerEvent = require('./invitedSpeakerEvent');

const InvitedSpeaker = db.define('invitedSpeaker', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
      type: sequelize.STRING,
      allowNull: false
  },
  description: {
      type: sequelize.TEXT,
      allowNull: false
  },
  job: {
    type: sequelize.STRING,
    allowNull: false
  }
})

// InvitedSpeaker.belongsToMany(Event, { through: InvitedSpeakerEvent });

module.exports = InvitedSpeaker