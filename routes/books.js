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

/* GET create new book form */
router.get('/new', async function(req, res, next) {
  res.render('new-book', {title: "New Book"});
});

/* POST new book to db */
router.post('/new', async function(req, res, next) {
  // let book;
  // try {
  //   book = await Book.create(req.body);
  //   res.redirect("/books/" + book.id);
  // } catch (error) {
  //   if (error.name === "SequelizeValidationError") {
  //     book = await Book.build(req.body);
  //     res.render("books/new", { book, errors: error.errors, title: "New Article" })
  //   } else {
  //     throw error; //error caught in the asyncHandler's catch block
  //   }
  // }
});

/* GET book detail form */
router.get('/:id', async function(req, res, next) {
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', { book, title: 'Update Book'});
});

/* UPDATE book in db */
router.post('/:id', async function(req, res, next) {
  res.render('layout', {});
});

/* DELETE book in db */
router.post('/:id/delete', async function(req, res, next) {
  res.render('layout', {});
});

module.exports = router;