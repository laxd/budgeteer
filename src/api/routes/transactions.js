const express = require("express");
const router = express.Router();
const transactionController = require('../controllers/TransactionController');

router.get("/",
    transactionController.validateAccountIdPresent(),
    transactionController.get_transactions);

// router.get("/:id", TransactionController.get_transaction);

router.post("/",
    transactionController.validate(),
    transactionController.add_transaction);

router.delete("/:id", transactionController.delete_transaction);

router.put("/:id", transactionController.update_transaction);

module.exports = router;
