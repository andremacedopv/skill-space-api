const sequelize = require('sequelize')
const db = require('../services/database')

const TagUser = db.define('tagUser', {
  userId: {
    type: sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
  tagId: {
    type: sequelize.INTEGER,
    references: { model: 'tags', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
})

module.exports = TagUser