const express = require("express");
const router = express.Router();
const AccountController = require('../controllers/AccountController');

router.get("/", AccountController.get_all_accounts);

router.get("/:id", AccountController.get_account);

router.post("/",
    AccountController.validate(),
    AccountController.create_account);

router.delete("/:id", AccountController.delete_account);

module.exports = router;
