const express = require('express');
const router = express.Router();

const routes = [
    'accounts',
    'budgets',
    'transactions'
];

routes.forEach(function (route) {
  router.use('/' + route, require('../routes/' + route));
});

module.exports = router;