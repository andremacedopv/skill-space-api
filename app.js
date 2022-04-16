require('dotenv').config();

const express = require('express');

const db = require('./src/services/database')

const app = express();

db.sync()
.then(result => {
    app.listen(3000);
})

