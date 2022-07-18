const sequelize = require('sequelize')
const db = require('../services/database');

const AdminPermission = db.define('adminPermission', {
  permissionId: {
    type: sequelize.INTEGER,
    references: { model: 'permissions', key: 'id' },
    onDelete: 'CASCADE',
    primaryKey: true
  },
  userId: {
    type: sequelize.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
    primaryKey: true
  },
})

module.exports = AdminPermission