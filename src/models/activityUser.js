const sequelize = require('sequelize')
const db = require('../services/database')

const ActivityUser = db.define('activityUser', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  activityId: {
    type: sequelize.INTEGER,
    references: { model: 'activities', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
  postId: {
    type: sequelize.INTEGER,
    references: { model: 'posts', key: 'id' },
    onDelete: 'cascade',
  },
  activityFeedbackId: {
    type: sequelize.INTEGER,
    references: { model: 'activityFeedbacks', key: 'id' },
    onDelete: 'cascade',
  },
  activitySubmissionId: {
    type: sequelize.INTEGER,
    references: { model: 'activitySubmissions', key: 'id' },
    onDelete: 'cascade',
  },
  dateStarted: {
    allowNull: false,
    type: sequelize.DATE,
    defaultValue: sequelize.DataTypes.NOW,
  },
  dateCompleted: {
    type: sequelize.DATE
  },
}, {
  scopes: {
      minimal: {
          attributes: { exclude: ['activitySubmissionId', 'activityFeedbackId', 'postId', 'userId', 'activityId', 'createdAt', 'updatedAt'] }
      }
  }  
})

module.exports = ActivityUser