const Sequelize = require('sequelize');

const sequelize = new Sequelize('skill-space', process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
