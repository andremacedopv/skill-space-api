const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST
});

// const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;
