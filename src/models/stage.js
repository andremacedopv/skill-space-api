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
    allowNull: false,
    unique: true
  },
  description: {
    type: sequelize.TEXT,
    allowNull: false
  },
  hoursRequirement: {
    type: sequelize.INTEGER,
  },
},)

module.exports = Post