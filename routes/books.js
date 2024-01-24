var express = require('express');
var router = express.Router();

const db = require('../models');
const { Book } = db;

/* GET books page, show full list of Books */
router.get('/', async function(req, res, next) {
  // res.render('layout', {title: 'Hello'});
  const books = await Book.findAll();
  // console.log(res.json(books));
  res.render('index', { books, title: "Books" });
});

/* CREATE new book form */
router.get('/new', async function(req, res, next) {
  res.render('layout', {title: 'create new book form placeholder'});
});

/* POST new book to db */
router.post('/new', async function(req, res, next) {
  res.render('layout', {title: 'post new book placeholder'});
});

/* GET book detail form */
router.get('/:id', async function(req, res, next) {
  res.render('layout', {title: 'show book detail form placeholder'});
});

/* UPDATE book in db */
router.post('/:id', async function(req, res, next) {
  res.render('layout', {title: 'update book details placeholder'});
});

/* DELETE book in db */
router.post('/:id/delete', async function(req, res, next) {
  res.render('layout', {title: 'delete book placeholder'});
});

module.exports = router;