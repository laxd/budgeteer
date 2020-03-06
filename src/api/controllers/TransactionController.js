const { check, body, validationResult } = require('express-validator');
const TransactionStatus = require('../../database/models/TransactionStatus');
const transactionService = require('../../services/TransactionService');
const accountService = require('../../services/AccountService');

exports.validate = () => {
    return [
        check('vendor').not().isEmpty(),
        check('amount').isNumeric(),
        check('date').isISO8601().toDate(),
        body('accountId', 'Account does not exist').custom(async val => {
            return await accountService.findAccount(val);
        }),
        body('status', 'Invalid status').custom(val => {
            console.log(Object.values(TransactionStatus));

            if(val && !Object.values(TransactionStatus).includes(val)) {
                return Promise.reject();
            }

            return Promise.resolve();
        })
    ]
};

exports.validateAccountIdPresent = () => {
    return [
        check('accountId').not().isEmpty()
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
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    transactionService.createTransaction(req.body)
        .then(transaction => {
            res.status(200)
                .json(transaction.toJson());
        }).catch(error => next(error))
};

exports.update_transaction = (req, res, next) => {
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