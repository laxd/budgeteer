var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING
}, {
    sequelize,
    timestamps: true
})

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    vendor: DataTypes.STRING,
    amount: DataTypes.BIGINT,
    date: DataTypes.DATE,
    cleared: DataTypes.BOOLEAN,
    reconciled: DataTypes.BOOLEAN
}, {
    sequelize
})

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

Account.hasMany(Transaction)
Transaction.belongsTo(Account)

Category.hasMany(Category, {
    foreignKey: 'parentCategory'
})
Category.belongsTo(Category)
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