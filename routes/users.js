var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator');
// Include User Model
var User = require('../models/user');
// Include Student Model
var Student = require('../models/student');
// Include Instructor Model
var Instructor= require('../models/instructor');

// User Register
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

// Register User
router.post('/register',  [	check('first_name', 'First name field is required').not().isEmpty(),
check('last_name', 'Last name field is required').not().isEmpty(),
check('email', 'Email field is required').not().isEmpty(),
check('email', 'Email must be a valid email address').isEmail(),
check('username', 'Username field is required').not().isEmpty(),
check('password', 'Password field is required').not().isEmpty(),
check('password2', 'Passwords do not match').custom((value, {req} ) => (value === req.body.password))],
function(req, res, next) {
 	// Get Form Values
	var first_name     	= req.body.first_name;
	var last_name     	= req.body.last_name;
  var address           = req.body.address;
	var email    		= req.body.email;
	var username 		= req.body.username;
	var password 		= req.body.password;
	var password2 		= req.body.password2;
	var type            = req.body.type;

	


const	errors = validationResult(req);

	if(errors){
    console.log(errors.mapped());
		res.render('users/register', {
			errors: errors.mapped()
		});
  } 
  else {
		var newUser = new User({
			email: email,
			username:username,
			password: password,
			type: type
		});

		if(type == 'student'){
			console.log('Registering Student...');

			var newStudent = new Student({
				first_name: first_name,
				last_name: last_name,
				address: address,
				email: email,
				username:username
			});

			User.saveStudent(newUser, newStudent, function(err, user){
				console.log('Student created');
			});
		} else {
			console.log('Registering Instructor...');
			var newInstructor = new Instructor({
				first_name: first_name,
				last_name: last_name,
				address: address ,
				email: email,
				username:username
			});

			User.saveInstructor(newUser, newInstructor, function(err, user){
				console.log('Instructor created');
			});
		}

		
	}
});

module.exports = router;
