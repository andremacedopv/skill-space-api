require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./src/services/database')

const router = require('./src/routes/routes')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

db.sync()
.then(result => {
    app.listen(3000);
})
