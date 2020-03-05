const {check, validationResult} = require('express-validator');
const budgetService = require('../../services/BudgetService');

exports.validate = () => {
    return [
        check("name").not().isEmpty()
    ]
};

exports.get_all_budgets = (req, res) => {
    budgetService.findAll()
        .then(budgets => {
            res.status(200)
                .json(budgets.map(budget => budget.toJson()));
        }).catch(error => next(error));
};

exports.get_budget = (req, res) => {
    budgetService.findBudget(req.param.id)
        .then(budget => {
            res.status(200)
                .json(budget.toJson())
        }).catch(error => next(error));
};

exports.create_budget = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422)
            .json({errors: errors.array()});
    }

    budgetService.createBudget(req.body.name)
        .then(budget => {
            res.status(200)
                .json(budget.toJson());
        }).catch(error => next(error));
};

exports.update_budget = (req, res) => {
    budgetService.updateBudget(req.params.id)
        .then(budget => {
            res.status(200)
                .json(budget.toJson());
        }).catch(error => next(error));
};

exports.delete_budget = (req, res) => {
    budgetService.deleteBudget(req.params.id)
        .then(() => {
            res.status(200)
                .json({message: "Budget deleted"});
        }).catch(error => next(error))
};