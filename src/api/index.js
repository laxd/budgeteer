const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes/index'));

// Anything that isn't matched above gets a 404
app.use((req, res, next) => {
    const error = new Error(`Method ${req.method} not registered at ${req.path}`);
    error.status = 404;
    next(error);
});

// Generic error handler
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500)
        .send({
            error: error.message
        });
});

module.exports = app;