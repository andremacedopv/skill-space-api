require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./src/services/database')

const router = require('./src/routes/routes')
const authRouter = require('./src/routes/auth')

const associateModels = require('./src/middlewares/associations');

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(associateModels)
app.use(router);
app.use(authRouter);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

db.sync()
.then(result => {
    app.listen(3333);
})
