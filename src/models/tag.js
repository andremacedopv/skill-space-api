const sequelize = require('sequelize')
const db = require('../services/database')

const Tag = db.define('tags', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Tag