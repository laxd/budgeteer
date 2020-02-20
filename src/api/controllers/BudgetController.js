const {check, validationResult} = require('express-validator');
const {Budget} = require('../../database/models/index');
const BudgetService = require('../../services/BudgetService');

exports.validate = () => {
    return [
        check("name").not().isEmpty()
    ]
};

exports.get_all_budgets = (req, res) => {
    BudgetService.findAll()
        .then(budgets => {
            res.status(200)
                .json(budgets.map(budget => Budget.toJson(budget)));
        }).catch(error => next(error));
};

exports.get_budget = (req, res) => {
    BudgetService.findBudget(req.param.id)
        .then(budget => {
            res.status(200)
                .json(Budget.toJson(budget))
        }).catch(error => next(error));
};

exports.create_budget = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422)
            .json({errors: errors.array()});
    }

    BudgetService.createBudget(req.body.name)
        .then(budget => {
            res.status(200)
                .json(Budget.toJson(budget));
        }).catch(error => next(error));
};

exports.update_budget = (req, res) => {
    BudgetService.updateBudget(req.params.id)
        .then(budget => {
            res.status(200)
                .json(Budget.toJson(budget));
        }).catch(error => next(error));
};

exports.delete_budget = (req, res) => {
    BudgetService.deleteBudget(req.params.id)
        .then(() => {
            res.status(200)
                .json({message: "Budget deleted"});
        }).catch(error => next(error))
};