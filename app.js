require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./src/services/database')

const router = require('./src/routes/routes');
const associateModels = require('./src/middlewares/associations');

const app = express();
app.use(bodyParser.json());

app.use(associateModels)
app.use(router);

db.sync()
.then(result => {
    app.listen(3000);
})
