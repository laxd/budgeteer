const { check, validationResult } = require('express-validator');
const { Account, Budget } = require('../../database/models/index');
const { findAccount } = require('../../services/AccountService');

exports.validate = () => {
    return [
        check('name').not().isEmpty(),
        check('budgetId', 'Budget does not exist').custom(val => {
            if(!val) {
                return Promise.reject("budgetId must be a valid budget");
            }

            return Budget.findOne({
                where: {
                    id: val
                }
            }).then(budget => {
                if(!budget) {
                    return Promise.reject("budgetId must be a valid budget");
                }
            });
        })
    ]
};

exports.get_all_accounts = (req, res) => {
    Account.findAll()
        .then(accounts => {
            res.status(200)
                .json({
                    links: {
                        self: "/accounts"
                    },
                    data: accounts.map(account => Account.toJson(account))
                });
        })
        .catch(error => {
            res.status(500)
                .json({ error: error.message });
        });
};

exports.get_account = (req, res) => {
    findAccount(req.params.id)
        .then((account) => {
            console.log(account);

            if(account) {
                res.status(200)
                    .json(Account.toJson(account));
            }
            else {
                res.status(404)
                    .json("Not found");
            }
        });
};

exports.create_account = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }


    Account.build({
        name: req.body.name,
        startingBalance: req.body.startingBalance,
        BudgetId: req.body.budgetId,

    })
        .save()
        .then(account => {
            res.status(200)
                .json(Account.toJson(account));
        })
        .catch(error => {
            res.status(500)
                .json({ error: error.message });
        });
};