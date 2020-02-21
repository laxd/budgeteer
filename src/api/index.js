const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { catchAllErrorHandler, notFoundErrorHandler } = require('./ErrorHandler');
app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes/index'));

// Anything that isn't matched above gets a 404
app.use(notFoundErrorHandler);

// Generic error handler
app.use(catchAllErrorHandler);

module.exports = app;