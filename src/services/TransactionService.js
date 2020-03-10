const {Transaction, Account, Category} = require('../database/models');
const TransactionStatus = require('../database/models/TransactionStatus');
const AccountService = require('./AccountService');
const createError = require('http-errors');
const logger = require('../loaders/logger');

module.exports = {

    findTransactions: (accountId) => {
        return Transaction.findAll({
            where: {
                accountId: accountId
            },
            include: [{
                model: Account
            }, {
                model: Category
            }]
        });
    },

    createTransaction: async (transaction) => {
        const account = await AccountService.findAccount(transaction.accountId);

        if(!account) {
            throw createError(404, "Account does not exist");
        }

        logger.info("Creating transaction");
        logger.info(transaction);

        return Transaction.build({
            vendor: transaction.vendor,
            amount: transaction.amount,
            date: new Date(transaction.date * 1000),
            status: transaction.status,
            AccountId: transaction.accountId,
            CategoryId: transaction.categoryId
        }).save();
    },

    updateTransaction: (id, values) => {
        return Transaction.findOne({
            where: {
                id: id
            }
        }).then(result => {
            // Only update the values that have actually changed and actually exist
            for (let key in values) {
                if (key in result) {
                    result[key] = values[key];
                }
            }

            return result.save();
        });
    },

    deleteTransaction: (id) => {
        return Transaction.findOne({
            where: {
                id: id
            }
        }).then(result => {
            if (result) {
                result.destroy();
            }
        });
    }
}