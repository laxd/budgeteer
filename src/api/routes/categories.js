const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get("/", categoryController.get_all_categories);

router.get("/:id", categoryController.get_category);

router.post("/",
    categoryController.validate(),
    categoryController.create_category);

router.delete("/:id", categoryController.delete_category);

module.exports = router;
