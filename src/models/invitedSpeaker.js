const sequelize = require('sequelize')
const db = require('../services/database')

const invitedSpeaker = db.define('address', {
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

module.exports = invitedSpeaker