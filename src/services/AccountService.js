const { sequelize } = require('../database/models');
const { Account, Transaction } = require('../database/models');

async function createAccount(account) {
    return await Account.create({
        name: account.name,
        BudgetId: account.budgetId,
        transactions: [{
            vendor: "Self",
            amount: account.startingBalance,
            date: new Date(),
            AccountId: created.id
        }]
    }, {
        include: [{
            association: Transaction
        }]
    });
}

async function findAccount(id) {
    const accountPromise = Account.findOne({
        where: {
            id: id
        }
    });

    const balancePromise = getCurrentBalance(id);

    const account = await accountPromise;
    account.balance = await balancePromise;

    return account;
}

async function getCurrentBalance(accountId) {
    const sum = await Transaction.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'transactionSum']],
        where: {
            accountId: accountId
        },
        raw: true
    });

    return sum[0].transactionSum;
}

module.exports = {
    findAccount
};