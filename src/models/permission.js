const sequelize = require('sequelize')
const db = require('../services/database')

const Permission = db.define('permission', {
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
})

module.exports = Permission