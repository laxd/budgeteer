const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.app.get('models').Budget
      .findAll()
      .then(budgets => res.json(budgets));
});

router.get("/:budgetId", function(req, res) {
  res.app.get('models').Budget
      .findAll({
          where: {
            id: req.params.id
          }
      })
      .then(budget => res.json(budget));
});

router.post("/", function(req, res) {
  res.app.get('models').Budget
      .build({
          name: req.body.name
      })
      .save()
      .then(budget => res.json(budget));
});

router.put("/:budgetId", function(req, res) {
  res.app.get('models').Budget
      .findAll({
          where: {
            id: req.params.id
          }
      })
      .then(budget => {
        if(budget === null) {
          res.statusCode = 404;
        }
        else {
          budget.name = req.body.name;
          budget.save();
          res.statusCode = 200;
          res.json(budget)
        }
      })
      .catch(() => {
        res.statusCode = 500;
      });
});

router.delete("/:budgetId", function(req, res) {
  console.log("Delete...");
  res.app.get('models').Budget
      .findAll({
          where: {
            id: req.params.id
          }
      })
      .then(budget => {
        console.log("FOUND");
        if(budget === null) {
            res.statusCode = 404;
            res.json("Budget not found");
        }
        else {
          console.log("Destroying...");
            budget.destroy();
        }
      })
      .catch(() => {
        res.statusCode = 500
      });
});

module.exports = router;
