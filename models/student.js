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
     quiz:[
        {
            class_id: {type: [mongoose.Schema.Types.ObjectId]},
            class_title: {type: String} ,
            total:{type: Number},
            obtained_marks: {type: Number},
            
        }
    ],
    mid:[{
        class_id: {type: [mongoose.Schema.Types.ObjectId]},
        class_title: {type: String} ,
        total:{type: Number},
        obtained_marks: {type: Number} 
    }
    ],
    final:[{
        class_id: {type: [mongoose.Schema.Types.ObjectId]},
        class_title: {type: String} ,
        total:{type: Number},
        obtained_marks: {type: Number} 
    }
    ],
    assignment:[
        {   
            class_id: {type: [mongoose.Schema.Types.ObjectId]},
            class_title: {type: String} ,
             total:{type: Number},
             obtained_marks: {type: Number}

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



module.exports.addQuiz = function(info_student,callback)
{
    class_id = info_student['class_id']; 
    student_username = info_student['student_username']; 
     class_title = info_student['class_title'];
     total = info_student['total'];
     obtained_marks = info_student['obtained_marks']; 
     var query = {username: student_username };
     
     
        Student.findOneAndUpdate(
            query,
            {$push: {"quiz": {class_id: class_id, class_title: class_title, total: total, obtained_marks: obtained_marks}}},
            {safe: true, upsert: true},
            callback
        );
       
     
     

}
module.exports.addMid = function(info_student,callback)
{
    class_id = info_student['class_id']; 
    student_username = info_student['student_username']; 
     class_title = info_student['class_title']
     total = info['total'];
     obtained_marks = info['obtained_marks']; 
     var query = {username: student_username };
     
     
        Student.findOneAndUpdate(
            query,
            {$push: {"mid": {class_id: class_id, class_title: class_title, total: total, obtained_marks: obtained_marks}}},
            {safe: true, upsert: true},
            callback
        );
       
     
     

}
module.exports.addFinal = function(info_student,callback)
{
    class_id = info_student['class_id']; 
    student_username = info_student['student_username']; 
     class_title = info_student['class_title'];
     total = info_student['total'];
     obtained_marks = info_student['obtained_marks']; 
     var query = {username: student_username };
     
     
        Student.findOneAndUpdate(
            query,
            {$push: {"final": {class_id: class_id, class_title: class_title ,total: total, obtained_marks: obtained_marks}}},
            {safe: true, upsert: true},
            callback
        );
       
     
     

}
module.exports.addAssignment = function(info_student,callback)
{
    class_id = info_student['class_id']; 
    class_title = info_student['class_title'];
    student_username = info_student['student_username']; 
     
     total = info_student['total'];
     obtained_marks = info_student['obtained_marks']; 

     var query = {username: student_username };
     
     
        Student.findOneAndUpdate(
            query,
            {$push: {"assignment": {class_id: class_id, class_title: class_title, total: total, obtained_marks: obtained_marks}}},
            {safe: true, upsert: true},
            callback
        );
       
     
     

}