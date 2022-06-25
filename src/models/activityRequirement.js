const sequelize = require('sequelize')
const db = require('../services/database')

const ActivityRequirement = db.define('activityRequirement', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: sequelize.INTEGER
  },
  require: {
    type: sequelize.INTEGER,
    references: { model: 'activities', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
  required: {
    type: sequelize.INTEGER,
    references: { model: 'activities', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
})

module.exports = ActivityRequirement