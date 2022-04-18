const sequelize = require('sequelize')
const db = require('../services/database')

const Address = db.define('address', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  country: {
    type: sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: sequelize.STRING,
    allowNull: false,
  },
  street: {
    type: sequelize.STRING,
    allowNull: false,
  },
  neighborhood: {
    type: sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Address