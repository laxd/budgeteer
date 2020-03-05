const express = require("express");
const router = express.Router();
const budgetController = require('../controllers/BudgetController');

router.get("/", budgetController.get_all_budgets);

router.get("/:id", budgetController.get_budget);

router.post("/",
    budgetController.validate(),
    budgetController.create_budget);

router.put("/:budgetId",
    budgetController.validate(),
    budgetController.update_budget);

router.delete("/:id", budgetController.delete_budget);

module.exports = router;
