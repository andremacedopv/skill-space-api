const sequelize = require('sequelize')
const db = require('../services/database')

const StageRequirement = db.define('stageRequirement', {
  stageId: {
    type: sequelize.INTEGER,
    references: { model: 'stages', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
  requirementId: {
    type: sequelize.INTEGER,
    references: { model: 'stages', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
})

module.exports = StageRequirement