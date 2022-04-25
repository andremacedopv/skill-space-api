require('dotenv').config();
module.exports =
{
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "skill-space",
    "host": "127.0.0.1",
    "dialect": "mysql",
    logging: true
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "skill-space",
    "host": "127.0.0.1",
    "dialect": "mysql",
    logging: true
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "skill-space",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
