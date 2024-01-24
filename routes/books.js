var express = require('express');
var router = express.Router();

const db = require('../models');
const { Book } = db;

/* GET Home page, re-directed to full list of books */
router.get('/', async function(req, res, next) {
  const books = await Book.findAll();
  res.render('index', { books, title: "Books" });
});

/* GET form to create new book entry */
router.get('/new', async function(req, res, next) {
  res.render('new-book', {title: "New Book"});
});

/* POST new book to db */
router.post('/new', async function(req, res, next) {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("form-error", { book, title: "New Book" })
    } else {
      throw error;
    }
  }
});

/* GET form to update book info */
router.get('/:id', async function(req, res, next) {
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', { book, title: 'Update Book'});
});

/* POST to update book in db */
router.post('/:id', async function(req, res, next) {
  res.render('layout', {});
});

/* DELETE book in db */
router.post('/:id/delete', async function(req, res, next) {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;