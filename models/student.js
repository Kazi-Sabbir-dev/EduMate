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
         
     }],
     grades:[{
        mid: {type: Number},
        quiz: {type: Number},
        final: {type: Number},
        mean: {type: Number}
    }]
});

const Student = module.exports = mongoose.model('Student', StudentSchema); 

module.exports.getStudentByUsername = function(username, callback)
{
    var query = {username: username};
    Student.findOne(query, callback);
}

module.exports.register = function(info, callback){
    student_username = info['student_username'];
    class_id = info['class_id'];
    class_title = info['class_title'];

    var query = {username: student_username};
    Student.findOneAndUpdate(
        query,
        {$push: {"classes": {class_id: class_id, class_title: class_title}}},
        {safe: true, upsert: true},
        callback
    );
}



module.exports.addGrade = function(info,callback)
{
    
    student_username = info['student_username'];
    mid = info['mid'];
    quiz = info['quiz'];
    final = info['final'];
    mean = info['mean'];

    
    Student.findByIdAndUpdate(
        student_username,
        {$push: {"grades": {mid: mid, quiz: quiz, final: final}}},
        {safe: true, upsert: true},
        callback
    );
    

}