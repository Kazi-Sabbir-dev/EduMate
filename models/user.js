var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const async = require('async');

const UserSchema = mongoose.Schema({

username:{
    type: String
},
email:{
    type: String
},
password:{
    type: String,
    bcrypt: true
},
type:{
    type: String
}





});

const User = module.exports = mongoose.model('User', UserSchema);

// Get User By Id

module.exports.getUserById = function(id,callback)
{
    User.findById(id,callback);
}

// get User by Username

module.exports.getUserByUsername = function(username,callback)
{
    var query = {username: username};
    User.findOne(query,callback);
}

// Compare password
module.exports.comparePassword = function(candidatePassword, hash, callback)
{
    bcrypt.compare(candidatePassword, hash, function(err, isMatch)
    {
        if(err) throw err;
        callback(null, isMatch);
    }
    );
}


// Create Student User
module.exports.saveStudent = function(newUser, newStudent, callback)
{
    bcrypt.hash(newUser.password, saltRounds , function(err,hash)
    {
            if(err) throw err;
            //set hash
            newUser.password = hash;
            console.log('Student is being saved');
             Promise.all(newUser.save(), newStudent.save()).then(value => 
                {
                    console.log(value)
                }).catch(error => 
                    {
                        console.log(error.message)
                    });
             

    });
}

// Create Instructor User

module.exports.saveInstructor = function(newUser, newInstructor, callback)
{
    bcrypt.hash(newUser.password, saltRounds, function(err,hash)
    {
        if(err) throw err;
        //set hash
        newUser.password = hash;
        console.log('Instructor is being saved');
        Promise.all(newUser.save(), newInstructor.save()).then(value => 
            {
                console.log(value)
            }).catch(error => 
                {
                    console.log(error.message)
                });
     });
}
