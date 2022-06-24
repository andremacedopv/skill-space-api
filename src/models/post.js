const sequelize = require('sequelize')
const db = require('../services/database')

const Post = db.define('posts', {
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
  userId: {
    type: sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'SET NULL'
  },
  parentPostId: {
    type: sequelize.INTEGER,
    references: { model: 'posts', key: 'id' },
    onDelete: 'CASCADE',
  }
})

module.exports = Post