const { check, query, validationResult } = require('express-validator');
const { Transaction } = require('../../database/models/index');
const TransactionService = require('../../services/TransactionService');
const AccountService = require('../../services/AccountService');

exports.validate = () => {
    return [
        check('vendor').not().isEmpty(),
        check('amount').isNumeric(),
        check('date').isISO8601().toDate(),
        check('accountId', 'Account does not exist').custom(val => {
            AccountService.findAccount(val).then(account => {
                if(!account) {
                    return Promise.reject("Account does not exist");
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

exports.get_transactions = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    TransactionService.findTransactions(req.query.accountId)
        .then(transactions => {
            res.status(200)
                .json(transactions.map(transaction => Transaction.toJson(transaction)));
        }).catch(error => next(error))
};

exports.add_transaction = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    TransactionService.createTransaction(req.body)
        .then(transaction => {
            res.status(200)
                .json(Transaction.toJson(transaction));
        }).catch(error => next(error))
};

exports.update_transaction = (req, res) => {
    // Find the given transaction first
    TransactionService.updateTransaction(req.params.id, req.body)
        .then(transaction => {
            res.status(200)
                .json(Transaction.toJson(transaction));
        }).catch(error => next(error))
};


exports.delete_transaction = (req, res) => {
    TransactionService.deleteTransaction(req.params.id)
        .then(() => {
            res.status(200)
                .json({ message: "Transaction deleted" });
        }).catch(error => next(error))
};