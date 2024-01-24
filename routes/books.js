var express = require('express');
var router = express.Router();

// const db = require('../models');
// const { Book } = db;

router.get('/', async function(req, res, next) {
  // const books = await db.findAll();
  res.render('layout');
});

module.exports = router;