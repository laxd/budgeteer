const {sequelize} = require('../database/models');
const {Account, Transaction} = require('../database/models');
const logger = require('../loaders/logger');

module.exports = {
    createAccount: (account) => {
        logger.silly("Creating account: " + account.name);
        return Account.create({
            name: account.name,
            BudgetId: account.budgetId,
            Transactions: [{
                vendor: "Self",
                amount: account.startingBalance || 0,
                date: new Date()
            }]
        }, {
            include: [{
                association: Account.Transactions
            }]
        });
    },

    findAccount: (id) => {
        logger.silly("Finding account: ", id);
        return Account.findOne({
            where: {
                id: id
            }
        });
    },

    findAccountsForBudget: (id) => {
        return Account.findAll({
                where: {
                    BudgetId: id
                }
            }
        );
    },

    deleteAccount: (id) => {
        logger.silly("Deleting account: ", id);
        return Account.findOne({
            where: {
                id: id
            }
        })
            .then(account => {
                if (account) {
                    account.destroy();
                }
            });
    },

    getCurrentBalance: (accountId) => {
        return Transaction.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'transactionSum']],
            where: {
                accountId: accountId
            },
            raw: true
        }).then((result) => {
            return result[0].transactionSum;
        });
    }
};