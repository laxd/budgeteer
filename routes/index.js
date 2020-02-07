const express = require('express');
const router = express.Router();

const routes = [
    'accounts',
    'budgets'
];

routes.forEach(function (route) {
  router.use('/' + route, require('../routes/' + route));
});

module.exports = router;