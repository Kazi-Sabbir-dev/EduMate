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
     grades:[
        {
            class_id: {type: [mongoose.Schema.Types.ObjectId]},
            quiz: {type: Number},
            mid: {type: Number},
            final: {type: Number},
            assignment: {type: Number}
        }
    ]
    
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
    class_id = info['class_id']; 
    student_username = info['student_username']; 
     quiz = info['quiz'] ;
     mid = info['mid'] ;
      final = info['final']; 
     assignment = info['assignment'] ;
     var query = {username: student_username };
     
     
        Student.findOneAndUpdate(
            query,
            {$push: {"grades": {class_id: class_id, quiz: quiz, mid: mid, final: final, assignment: assignment}}},
            {safe: true, upsert: true},
            callback
        );
       
     
     

}