const express = require("express");
const router = express.Router();
const BudgetController = require('../controllers/BudgetController');

router.get("/", BudgetController.get_all_budgets);

router.get("/:budgetId", BudgetController.get_budget);

router.post("/", BudgetController.create_budget);

router.put("/:budgetId", BudgetController.update_budget);

router.delete("/:budgetId", BudgetController.delete_budget);

module.exports = router;
