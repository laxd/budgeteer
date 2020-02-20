const { Budget } = require('../database/models');
const createError = require('http-errors');

class BudgetService {

    findBudget(id) {
        return Budget.findOne({
            where: {
                id: id
            }
        }).then((budget) => {
            if(!budget) {
                throw createError(404, "Budget not found");
            }

            return budget;
        })
    }

    findAll() {
        return Budget.findAll();
    }

    createBudget(name) {
        return Budget.create({
            name: name
        });
    }

    updateBudget(id, values) {
        return this.findBudget(id)
            .then(result => {
                // Only update the values that have actually changed and actually exist
                for (let key in values) {
                    if (key in result) {
                        result[key] = values[key];
                    }
                }

                result.save();
            });
    }

    deleteBudget(id) {
        Budget.findOne({
            where: {
                id: id
            }
        }).then(budget => {
            if (budget) {
                budget.destroy();
            }
            else {
                createError(404, "Budget not found");
            }
        });
    }
}

module.exports = new BudgetService();