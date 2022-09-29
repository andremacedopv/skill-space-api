const Sequelize = require('sequelize');

// const sequelize = new Sequelize('skill-space', process.env.DB_USER, process.env.DB_PASSWORD, {
//     dialect: 'mysql',
//     host: 'localhost'
// });

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

module.exports = sequelize;
