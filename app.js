var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./models');
const { Book } = db;

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

// Sync database
(async () => {
  try {
    await db.sequelize.authenticate();
    db.sequelize.sync();
  } catch (error) {
    console.error('Authentication failed: db not synced' + error);
  }
})();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Sorry! That page was not found!');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {

  // render the error page
  res.status(err.status || 500);
  if (err.status === 500) {
    err.message = 'Sorry! An internal server error occurred!';
  }
  res.render('error', {error: err});
});

module.exports = app;
