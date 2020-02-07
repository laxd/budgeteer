const uuidv4 = require('uuid/v4');

function find(budgetId) {
  return budgets.find(b => b.id === budgetId)
}

let budgets = [{
  id: uuidv4(),
  budget_name: "Main Budget"
}];

const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.json(budgets)
});

router.get("/:budgetId", function(req, res) {
  res.json(budgets.find(a => a.id === req.params.budgetId))
});

router.post("/", function(req, res) {
  let budget = {
    "id": uuidv4(),
    "budget_name": req.query.budget_name
  };

  budgets.push(budget);

  res.statusCode = 200;
  res.send(budget)
});

router.put("/:budgetId", function(req, res) {
  let budget = findBudget(req.params.budgetId);

  if(budget === null) {
    res.statusCode = 404;
    res.send("Budget not found " + req.params.budgetId)
  }
  else {
    budget.budget_name = req.query.budget_name
  }
});

router.delete("/:budgetId", function(req, res) {
  let budget = findBudget(req.params.budgetId);

  if(budget === null) {
    res.statusCode = 404;
    res.send("Budget not found " + req.params.budgetId)
  }
  else {
    budgets.pop(budget);

    res.statusCode = 200;
    res.send(budget)
  }
});

module.exports = router;
