var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

const Budget = sequelize.define('Budget', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING
},{
    sequelize,
    timestamps: true
})

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING
}, {
    sequelize
})

Category.hasMany(Category)

sequelize.sync()

var accountsRouter = require('./routes/accounts')
var budgetsRouter = require('./routes/budgets')
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/accounts', accountsRouter);
app.use('/budgets', budgetsRouter);

app.listen("9000", "0.0.0.0")