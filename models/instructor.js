var mongoose = require('mongoose');
//Student Schema

const instructorSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
     address: {
         type: String
     },
     username: {
         type: String
     },
     email: {
        type: String
     },
     classes: [{
         class_id: {type: [mongoose.Schema.Types.ObjectId]},
         class_title: {type: String}
     }]
});

const Instructor = module.exports = mongoose.model('Instructor', instructorSchema); 

module.exports.getInstructorByUsername = function(username, callback)
{
    var query = {username: username};
    Instructor.findOne(query, callback);
}