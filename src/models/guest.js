// Imports
const db = require('../services/database')
const sequelize = require('sequelize');

// Model definition
const Guest = db.define('guest', {
    // id: {
    //   type: sequelize.INTEGER,
    //   autoIncrement: true,
    //   allowNull: false,
    //   primaryKey: true
    // },
    eventId: {
      type: sequelize.INTEGER,
      references: { model: 'events', key: 'id' },
      onDelete: 'cascade',
      primaryKey: true
    },
    userId: {
      type: sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onDelete: 'cascade',
      primaryKey: true
    },
    organizer: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    present: {
      type: sequelize.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: sequelize.ENUM,
      values: ['Confirmed','Invitation Sent','Declined','Maybe','Invitation Pending'],
      allowNull: false,
      defaultValue: 'Invitation Pending'
    },
});

module.exports = Guest;
