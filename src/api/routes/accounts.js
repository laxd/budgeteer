const express = require("express");
const router = express.Router();
const accountController = require('../controllers/AccountController');

router.get("/", accountController.get_all_accounts);

router.get("/:id", accountController.get_account);

router.post("/",
    accountController.validate(),
    accountController.create_account);

router.delete("/:id", accountController.delete_account);

module.exports = router;
