var express = require('express');
var router = express.Router();

const db = require('../models');
const { Book } = db;

/* GET all books to view on page, re-directed from '/' */
router.get('/', async function (req, res, next) {
  const books = await Book.findAll();
  res.render('index', { books, title: "Books" });
});

/* GET search books */
router.get('/search', async function (req, res, next) {
  const category = req.query.category;
  const search = req.query.search.toLowerCase();
  const books = await Book.findAll();

  // No results found
  if (!search.trim()) {
    res.render('error', { error: {}, title: "No results were found." });
  };

  // Filter books based on category and search query
  const filteredBooks = books.filter(book => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    const genre = book.genre.toLowerCase();

    if (category === 'title' && title.includes(search)) {
      return true;
    } else if (category === 'author' && author.includes(search)) {
      return true;
    } else if (category === 'genre' && genre.includes(search)) {
      return true;
    } else if (category === 'year' && book.year.includes(search)) {
      return true;
    }
  });

  // Ensure filteredBooks is not empty
  if (filteredBooks.length > 0) {
    res.render('home-btn', { books: filteredBooks, title: 'Results' });
  } else {
    res.render('error', { error: {}, title: "No results were found." });
  };

});

/* GET form to create new book entry */
router.get('/new', async function (req, res, next) {
  res.render('new-book', { title: "New Book" });
});

/* POST new book to db */
router.post('/new', async function (req, res, next) {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("form-error-create", { book, title: "New Book" })
    } else {
      throw error;
    }
  }
});

/* GET form to update book info */
router.get('/:id', async function (req, res, next) {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('update-book', { book, title: 'Update Book' });
  } else {
    next(); // error route
  }
});

/* POST to update book in db */
router.post('/:id', async function (req, res, next) {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {

      // Additional validation before updating book
      if (!req.body.title || !req.body.author) {
        res.render("form-error-update", { book, title: "Update Book" });
      }

      await book.update(req.body);
      res.redirect("/");
    } else {
      next(); // go to error routes
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("form-error-update", { book, title: "Update Book" })
    } else {
      throw error;
    }
  }
});

/* DELETE book in db */
router.post('/:id/delete', async function (req, res, next) {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;