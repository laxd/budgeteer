const { sequelize } = require('../database/models');
const { Account, Transaction } = require('../database/models');

async function findAccount(id) {
    const account = await Account.findOne({
        where: {
            id: id
        }
    });

    account.currentBalance = getCurrentBalance(account);

    return account;
}

async function getCurrentBalance(account) {
    const sum = await Transaction.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'transactionSum']],
        where: {
            accountId: account.id
        }
    }).then((result) => {
        return result;
    });

    console.log("Sum: " + sum);

    return sum + account.startingBalance;
}

module.exports = {
    findAccount
};