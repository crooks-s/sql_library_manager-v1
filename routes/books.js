var express = require('express');
var router = express.Router();

const db = require('../models');
const { Book } = db;

router.get('/', async function(req, res, next) {
  // res.render('layout', {title: 'Hello'});
  const books = await Book.findAll();
  // console.log(res.json(books));
  res.render('index', { books, title: "Books" });
});

module.exports = router;