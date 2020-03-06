const {Transaction, Account} = require('../database/models');
const TransactionStatus = require('../database/models/TransactionStatus');
const AccountService = require('./AccountService');
const createError = require('http-errors');

module.exports = {

    findTransactions: (accountId) => {
        return Transaction.findAll({
            where: {
                accountId: accountId
            },
            include: Account
        });
    },

    createTransaction: async (transaction) => {
        const account = await AccountService.findAccount(transaction.accountId);

        if(!account) {
            throw createError(404, "Account does not exist");
        }

        return Transaction.build({
            vendor: transaction.vendor,
            amount: transaction.amount,
            date: transaction.date,
            status: transaction.status,
            AccountId: transaction.accountId
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