const { check, validationResult } = require('express-validator');

exports.validate = () => {

};

exports.get_all_budgets = (req, res) => {
    res.app.get('models').Budget
        .findAll()
        .then(budgets => res.json(budgets));
};

exports.get_budget = (req, res) => {
    res.app.get('models').Budget
        .findAll({
            where: {
                id: req.params.id
            }
        })
        .then(budget => res.json(budget));
};

exports.create_budget = (req, res) => {
    res.app.get('models').Budget
        .build({
            name: req.body.name
        })
        .save()
        .then(budget => res.json(budget));
};

exports.update_budget = (req, res) => {
    res.app.get('models').Budget
        .findAll({
            where: {
                id: req.params.id
            }
        })
        .then(budget => {
            if(budget === null) {
                res.statusCode = 404;
            }
            else {
                budget.name = req.body.name;
                budget.save();
                res.statusCode = 200;
                res.json(budget)
            }
        })
        .catch(() => {
            res.statusCode = 500;
        });
};

exports.delete_budget = (req, res) => {
    res.app.get('models').Budget
        .findAll({
            where: {
                id: req.params.id
            }
        })
        .then(budget => {
            if(budget === null) {
                res.statusCode = 404;
                res.json("Budget not found");
            }
            else {
                budget.destroy();
            }
        })
        .catch(() => {
            res.statusCode = 500
        });
};