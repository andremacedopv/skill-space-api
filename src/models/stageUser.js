const sequelize = require('sequelize')
const db = require('../services/database')

const StageUser = db.define('stageUser', {
  stageId: {
    type: sequelize.INTEGER,
    references: { model: 'stages', key: 'id' },
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
  dateStarted: {
    type: sequelize.DATE,
    defaultValue: sequelize.DataTypes.NOW
  },
  dateCompleted: {
    type: sequelize.DATE,
  }
})

module.exports = StageUser