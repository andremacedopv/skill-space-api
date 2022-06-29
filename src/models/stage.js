const sequelize = require('sequelize')
const db = require('../services/database')

const Post = db.define('stages', {
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
  timeRequirement: {
    type: sequelize.TIME
  },
})

module.exports = Post