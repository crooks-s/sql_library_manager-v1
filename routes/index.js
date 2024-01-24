var express = require('express');
var router = express.Router();

/* GET home page, re-direct to /books */
router.get('/', function(req, res, next) {
  res.redirect('/books');
});

module.exports = router;
