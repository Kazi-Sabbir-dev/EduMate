var mongoose = require('mongoose');
//Student Schema

const StudentSchema = mongoose.Schema({
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

const Student = module.exports = mongoose.model('Student', StudentSchema); 