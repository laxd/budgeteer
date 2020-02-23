const { check, validationResult } = require('express-validator');
const { Account, Budget } = require('../../database/models/index');
const AccountService = require('../../services/AccountService');
const BudgetService = require('../../services/BudgetService');
const logger = require('../../loaders/logger');

exports.validate = () => {
    return [
        check('name').not().isEmpty(),
        check('budgetId', 'Budget does not exist').custom(val => {
            if(!val) {
                return Promise.reject("budgetId must be a valid budget");
            }

            return BudgetService.findBudget(val).then(budget => {
                if(!budget) {
                    return Promise.reject("budgetId must be a valid budget");
                }
            });
        })
    ]
};

exports.get_all_accounts = (req, res, next) => {
    AccountService.findAccountsForBudget(req.query.budgetId)
        .then(accounts => {
            res.status(200)
                .json(accounts.map(account => Account.toJson(account)));
        }).catch(error => next(error))
};

exports.get_account = (req, res, next) => {
    AccountService.findAccount(req.params.id)
        .then((account) => {
            if(account) {
                res.status(200).json(Account.toJson(account));
            }
            else {
                res.status(404).json({
                    message: "Not found"
                });
            }
        }).catch(error => next(error))
};

exports.create_account = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    AccountService.createAccount(req.body)
        .then(account => {
            res.status(200)
                .json(Account.toJson(account));
        }).catch(error => next(error))
};

exports.delete_account = (req, res, next) => {
    AccountService.deleteAccount(req.params.id)
        .then(() => {
            res.status(200).json({
                status: "Success",
                message: "Account deleted"
            });
        }).catch(error => next(error))
};