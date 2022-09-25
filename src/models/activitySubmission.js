const sequelize = require('sequelize')
const db = require('../services/database')

const ActivitySubmission = db.define('activitySubmission', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: sequelize.TEXT,
    allowNull: true,
  },
  file: {
    type: sequelize.STRING,
    allowNull: true
  }
})

module.exports = ActivitySubmission