const sequelize = require('sequelize')
const db = require('../services/database')

const ActivityRequirement = db.define('activityRequirement', {
  activityId: {
    type: sequelize.INTEGER,
    references: { model: 'activities', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
  requirementId: {
    type: sequelize.INTEGER,
    references: { model: 'activities', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
})

module.exports = ActivityRequirement