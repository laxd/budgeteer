const { check, query, validationResult } = require('express-validator');
const transactionService = require('../../services/TransactionService');
const accountService = require('../../services/AccountService');

exports.validate = () => {
    return [
        check('vendor').not().isEmpty(),
        check('amount').isNumeric(),
        check('date').isISO8601().toDate(),
        check('accountId', 'Account does not exist').custom(val => {
            return accountService.findAccount(val).then(account => {
                console.log("Val: " + val + " account: " + account);
                if(account === undefined) {
                    console.log("Account does not exist!");
                    return Promise.reject();
                }
            });
        })
    ]
};

exports.validateAccountIdPresent = () => {
    return [
        query('accountId').not().isEmpty()
    ]
};

exports.get_transactions = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    const transactions = await transactionService.findTransactions(req.query.accountId);

    res.status(200)
        .json(transactions.map(transaction => transaction.toJson()));
};

exports.add_transaction = (req, res, next) => {
    console.log("Adding transaction:" + req.body);
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    console.log("Validation passed:" + req.body);

    transactionService.createTransaction(req.body)
        .then(transaction => {
            res.status(200)
                .json(transaction.toJson());
        }).catch(error => next(error))
};

exports.update_transaction = (req, res, next) => {
    // Find the given transaction first
    transactionService.updateTransaction(req.params.id, req.body)
        .then(transaction => {
            res.status(200)
                .json(transaction.toJson());
        }).catch(error => next(error))
};


exports.delete_transaction = (req, res, next) => {
    transactionService.deleteTransaction(req.params.id)
        .then(() => {
            res.status(200)
                .json({ message: "Transaction deleted" });
        }).catch(error => next(error))
};