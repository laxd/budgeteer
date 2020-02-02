var uuidv4 = require('uuid/v4')

let accounts = [{
  id: uuidv4(),
  account_name: "Monzo",
  transactions: [{
    vendor: "McDonalds",
    amount: "0.99",
    date: "01/02/2020",
    cleared: false,
    reconcilled: false
  }]
}, {
  id: uuidv4(),
  account_name: "Nationwide Current Account"
}
]

const express = require("express")
const router = express.Router();

router.get("/", function(req, res, next) {
  res.json(accounts)
})

router.get("/:accountId", function(req, res, next) {
  res.json(accounts.find(a => a.id == req.params.accountId))
})

// router.put("/", function(req, res, next) {
//   res.send("NYI")
// })

module.exports = router
