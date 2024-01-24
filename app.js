var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./models');
const { Book } = db;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Verify connection to database
// Sync database
(async () => {
  try {
    await db.sequelize.authenticate();
    db.sequelize.sync();
    // console.log('Authentication done, db synced');
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error();
  err.status = 404;
  err.message = 'Sorry! That page was not found.';
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {error: err});
});

module.exports = app;
