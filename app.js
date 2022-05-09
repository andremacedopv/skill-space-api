require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./src/services/database')

const router = require('./src/routes/routes')

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

db.sync()
.then(result => {
    app.listen(3333);
})
