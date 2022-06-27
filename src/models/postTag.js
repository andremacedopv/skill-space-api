const sequelize = require('sequelize')
const db = require('../services/database');

const PostTag = db.define('postTag', {
  postId: {
    type: sequelize.INTEGER,
    references: { model: 'posts', key: 'id' },
    onDelete: 'CASCADE',
    primaryKey: true
  },
  tagId: {
    type: sequelize.INTEGER,
    references: { model: 'tags', key: 'id' },
    onDelete: 'CASCADE',
    primaryKey: true
  },
})

module.exports = PostTag