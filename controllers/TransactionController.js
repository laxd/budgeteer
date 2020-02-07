const { check, query, validationResult } = require('express-validator');
const Account = require('../models/Account');

const getUrl = function (req) {
    return req.protocol + '://' + req.get('host') + "/transactions/";
};

exports.validate = () => {
    return [
        check('vendor').not().isEmpty(),
        check('amount').isNumeric(),
        check('date').toDate(),
        check('accountId').custom(val => {
            return true;
            // return Account.findOne({
            //     where: {
            //         id: val
            //     }
            // }) === null;
        })
    ]
};

exports.validateAccountIdPresent = () => {
    return [
        query('accountId', 'Account not found').not().isEmpty()
    ]
};

exports.get_transactions = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    res.app.get('models').Transaction
        .findAll({
            where: {
                accountId: req.query.accountId
            }
        })
        .then(transactions => {
            if(transactions) {
                res.status(200)
                    .json(transactions);
            }
            else {
                res.status(404)
                    .json("Not found");
            }
        })
        .catch(error => {
            res.status(500)
                .json({ error: error.message });
        });
};

exports.add_transaction = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    res.app.get('models').Transaction
        .build({
            vendor: req.body.vendor,
            amount: req.body.amount,
            date: req.body.date,
            AccountId: req.body.accountId
        })
        .save()
        .then(transaction => {
            res.status(200)
                .json({
                    id: transaction.id,
                    vendor: transaction.vendor,
                    date: transaction.date,
                    accountId: transaction.accountId,
                    request: {
                        method: "GET",
                        url: getUrl(req) + transaction.id
                    }
                });
        })
        .catch(error => {
            res.status(500)
                .json({ error: error.message });
        });
};