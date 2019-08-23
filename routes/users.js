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
router.post('/register',  [	
check('first_name', 'First name field is required').not().isEmpty(),
check('last_name', 'Last name field is required').not().isEmpty(),
check('email', 'Email field is required').not().isEmpty(),
check('email','email already exist').normalizeEmail().trim().custom(value =>{
	return findUserByEmail(value).then(User => {})
}),
check('email','enter a valid email').isEmail(),
check('username', 'Username field is required').not().isEmpty().trim().custom(value => {
	return findUserByUsername(value).then(User => {})
}),
check('password', 'Password field is required').not().isEmpty(),
check('password', 'password must contain 5 chars ').isLength({ min: 5 }).trim().escape(),
check('password2', 'Passwords do not match').custom((value, {req} ) => (value === req.body.password))




]
, function(req, res) {
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

	if(!errors.isEmpty()){
    console.log(errors.mapped());
		res.render('users/register', {
			errors: errors.mapped()
		});
	  }
	  
	   
	  else{ 
		var newUser = new User({
			username: username,
			email: email,
			password: password,
			type: type
	
	
		});
		console.log(newUser);
		if(type == 'student')
		{
			console.log('Registering student...');
			var newStudent = new Student({
				first_name: first_name,
				last_name: last_name,
				address: address,
				username: username,
				email: email
	
			});
			User.saveStudent(newUser, newStudent, function(err, user)
			{
				console.log('student ');
			});
			
		}
		else{
			console.log('Registering instructor');
			var newInstructor = new Instructor({
				first_name: first_name,
				last_name: last_name,
				address: address,
				username: username,
				email: email
			});
	
			User.saveInstructor(newUser, newInstructor, function(err, user)
			{
				console.log('Instructor ');
			});
			
				
				
		  }
	

		  
		  
		  req.flash('success_msg', 'User Added');
		  res.redirect('/login');
	
	
}
});
	
		

	

// finds if a user is already registered or not
function findUserByEmail(email){
	if(email)
	{
		return new Promise((resolve, reject) =>{
			User.findOne({email: email})
			.exec((err, doc) =>{
				if(err) return reject(err)
				else if(doc) return reject (new Error('This email already exists.Please enter another email.'))
				else return resolve(email)
			})
		})
	}
}
// finds if the username is already registered or not
function findUserByUsername(username){
	if(username)
	{
		return new Promise((resolve, reject) =>{
			User.findOne({username: username})
			.exec((err, doc) =>{
				if(err) return reject(err)
				else if(doc) return reject (new Error('This username already exist. Please try another username'))
				else return resolve(username)
			})
		})
	}
}

module.exports = router;
