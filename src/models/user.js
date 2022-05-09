// Imports
const db = require('../services/database')
const sequelize = require('sequelize');
const Address = require('./address');

// Model definition
const User = db.define('user', {
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
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: sequelize.STRING,
        allowNull: false
    },
    ddd: {
        type: sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize.STRING,
        allowNull: false
    },
    addressId: {
        type: sequelize.INTEGER,
        references: { model: 'addresses', key: 'id' },
        onDelete: 'SET NULL',
    },
    birthdate: {
        type: sequelize.DATE,
        allowNull: false
    },
    admin: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    owner: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_active: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

User.belongsTo(Address);

module.exports = User;
