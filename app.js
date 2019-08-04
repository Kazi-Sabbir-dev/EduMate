const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');

//database connection
mongoose.connect('mongodb://localhost:27017/edumate', {useNewUrlParser: true});

//Router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classRouter = require('./routes/classes');
const classDetails = require('./routes/classesDetails');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const loginRouter = require('./routes/login');
const gradesRouter = require('./routes/grades');

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
//Express Session

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  
}));



//passport
app.use(passport.initialize());
  app.use(passport.session());

  // Connect-Flash
app.use(flash());

// Global vars
app.use(function(req,res,next){
res.locals.messages = require('express-messages')(req, res);


next();
}
);

//routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/class', classRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/grades', gradesRouter);
app.use('/class/:id',classDetails);


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
