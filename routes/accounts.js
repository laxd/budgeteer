const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.app.get('models').Account.findAll()
      .then(accounts => res.json(accounts));
});

router.get("/:id", function(req, res) {
  res.app.get('models').Account
    .findOne({
      where: {
          id: req.params.id
      }
    })
    .then(account => res.json(account));
});

router.put("/", function(req, res) {
  console.log(req.body);
  res.app.get('models').Account
    .build({ name: req.body.name })
    .save()
    .then(account => res.json(account))
});

module.exports = router;
