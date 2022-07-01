const sequelize = require('sequelize')
const db = require('../services/database')

const Activity = db.define('activity', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: sequelize.INTEGER
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: sequelize.TEXT,
    allowNull: false
  },
  categoryId: {
    type: sequelize.INTEGER,
    references: { model: 'categories', key: 'id' },
    onDelete: 'SET NULL',
  },
  activityTypeId: {
    type: sequelize.INTEGER,
    references: { model: 'activityTypes', key: 'id' },
    onDelete: 'SET NULL',
  },
  eventId: {
    type: sequelize.INTEGER,
    references: { model: 'events', key: 'id' },
    onDelete: 'SET NULL',
  },
  stageId: {
    type: sequelize.INTEGER,
    references: { model: 'stages', key: 'id' },
    onDelete: 'SET NULL',
  },
  mandatory: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, {
  scopes: {
    noAssociation: {
      attributes: { exclude: ['eventId', 'activityTypeId', 'categoryId'] },
    },
  }  
})

module.exports = Activity