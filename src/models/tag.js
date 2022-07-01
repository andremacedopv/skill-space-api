const sequelize = require('sequelize')
const db = require('../services/database')

const Tag = db.define('tags', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  scopes: {
      noTime: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
  }  
})

module.exports = Tag