const {Transaction} = require('../database/models');
const AccountService = require('./AccountService');
const createError = require('http-errors');

class TransactionService {

    findTransactions(accountId) {
        return Transaction.findAll({
            where: {
                accountId: accountId
            }
        });
    }

    createTransaction(transaction) {
        console.log(transaction);
        return AccountService.findAccount(transaction.accountId)
            .then((account) => {
                if (account) {
                    console.log(account);
                    return Transaction.build({
                        vendor: transaction.vendor,
                        amount: transaction.amount,
                        date: transaction.date,
                        AccountId: transaction.accountId
                    }).save();
                }
                else {
                    throw createError(404, "Account does not exist");
                }
            });
    }

    updateTransaction(id, values) {
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
    }

    deleteTransaction(id) {
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

module.exports = new TransactionService();