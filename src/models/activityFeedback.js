const sequelize = require('sequelize')
const db = require('../services/database')

const ActivityFeedback = db.define('activityFeedback', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'cascade',
  },
  description: {
    type: sequelize.TEXT,
  },
  score: {
    type: sequelize.INTEGER,
  },
  approved: {
    type: sequelize.BOOLEAN,
  },
})

module.exports = ActivityFeedback