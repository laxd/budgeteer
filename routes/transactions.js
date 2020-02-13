const express = require("express");
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');

router.get("/",
    TransactionController.validateAccountIdPresent(),
    TransactionController.get_transactions);

// router.get("/:id", TransactionController.get_transaction);

router.post("/",
    TransactionController.validate(),
    TransactionController.add_transaction);

router.delete("/:id", TransactionController.delete_transaction);

router.put("/:id", TransactionController.update_transaction);

module.exports = router;
