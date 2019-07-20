const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expbs = require('express-handlebars');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classRouter = require('./routes/classes');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');


const app = express();

// view engine setup
app.engine('handlebars', expbs({ defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
 
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/class', classRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
