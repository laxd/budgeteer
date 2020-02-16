const express = require("express");
const router = express.Router();
const BudgetController = require('../../controllers/BudgetController');

router.get("/", BudgetController.get_all_budgets);

router.get("/:id", BudgetController.get_budget);

router.post("/",
    BudgetController.validate(),
    BudgetController.create_budget);

router.put("/:budgetId",
    BudgetController.validate(),
    BudgetController.update_budget);

router.delete("/:id", BudgetController.delete_budget);

module.exports = router;
