const { check, validationResult } = require('express-validator');
const accountService = require('../../services/AccountService');
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

exports.get_all_accounts = async (req, res) => {
    const accounts = await accountService.findAccountsForBudget(req.query.budgetId);

    res.status(200)
        .json(accounts.map(account => account.toJson()));
};

exports.get_account = async (req, res) => {
    const account = await accountService.findAccount(req.params.id);
    if(account) {
        res.status(200).json(account.toJson());
    }
    else {
        res.status(404).json({
            message: "Not found"
        });
    }
};

exports.create_account = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    const account = await accountService.createAccount(req.body);

    res.status(200)
        .json(account.toJson());
};

exports.delete_account = async (req, res) => {
    await accountService.deleteAccount(req.params.id);

    res.status(200).json({
        status: "Success",
        message: "Account deleted"
    });
};