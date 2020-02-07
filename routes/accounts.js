const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get("/", (req, res) => {
  res.app.get('models').Account.findAll()
      .then(accounts => res.json(accounts));
});

router.get("/:id", (req, res) => {
  res.app.get('models').Account
    .findOne({
      where: {
          id: req.params.id
      }
    })
    .then(account => res.json(account));
});

router.put("/", [
    check('name').not().isEmpty()
        .trim()
        .escape()
], (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422)
        .json({ errors: errors.array() });
  }

  console.log(req.body);
  res.app.get('models').Account
    .build({ name: req.body.name })
    .save()
    .then(account => res.json(account))
});

module.exports = router;
