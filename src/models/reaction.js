const sequelize = require('sequelize')
const db = require('../services/database')

const Reaction = db.define('reaction', {
  userId: {
    type: sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
  postId: {
    type: sequelize.INTEGER,
    references: { model: 'posts', key: 'id' },
    onDelete: 'cascade',
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: sequelize.ENUM,
    values: ['Like','Dislike','Funny','Sad','Love','Surprise','Angry'],
    allowNull: false,
  },
})

module.exports = Reaction