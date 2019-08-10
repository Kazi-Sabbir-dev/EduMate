var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Include User Model
var User = require('../models/user');
// Include Student Model
var Student = require('../models/student');
// Include Instructor Model
var Instructor= require('../models/instructor');

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'EduMate' });
});

passport.serializeUser(function(user, done)
{
  done(null, user._id);
});
passport.deserializeUser(function(id, done)
{
  User.getUserById(id, function(err, user){
    done(err,user);
  });
});

router.post('/', passport.authenticate('local',{failureRedirect: '/login', failureFlash: true}) ,function(req, res, next)
{
    req.flash('success_msg', 'You are now logged in');
    var usertype = req.user.type;
    res.redirect('/'+usertype+'s/classes');
});
passport.use(new LocalStrategy(
  function(username, password, done)
  {
    User.getUserByUsername(username, function(err, user)
    {
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown user'+ username});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) return done(err);
        if(isMatch)
        {
          return done (null, user);
        }
        else{
          console.log('Invalid Password');
          //success message
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  }
));

module.exports = router;
