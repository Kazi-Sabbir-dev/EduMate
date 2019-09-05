const mongoose = require('mongoose');
//class schema

const ClassSchema = mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    Instructor:
    {
        type: String
    },
    class_code:
    {
        type: Number
    },
    student_code:
    {
        type: Number
    },
    //Array of objects
    lessons:[{
        lesson_number: {type: Number},
        lesson_title: {type: String},
        lesson_body: {type: String}
    }],
    enrolled_students:[
        {
            student_username: {type: String}
        }
    ],
    quiz:[
        {
            student_username: {type: String},
            total:{type: Number},
            obtained_marks: {type: Number} 
        }
    ],
    mid:[{
        student_username: {type: String},
        total:{type: Number},
        obtained_marks: {type: Number} 
    }
    ],
    final:[{
        student_username: {type: String},
        total:{type: Number},
        obtained_marks: {type: Number} 
    }
    ],
    assignment:[
        {   
            student_username: {type: String},
             total:{type: Number},
             obtained_marks: {type: Number}

        }
    ]
    
   
});

const Class = module.exports = mongoose.model('Class', ClassSchema);

//Fetch All classes

module.exports.getClasses = function(callback)
{
    Class.find(callback);
}

// Fetch single classes.
module.exports.getclassById = function(id,callback)
{
    Class.findById(id,callback);
}

module.exports.addLesson = function(info,callback)
{
    class_id = info['class_id'];
    lesson_number = info['lesson_number'];
    lesson_title = info['lesson_title'];

    lesson_body = info['lesson_body'];
    Class.findByIdAndUpdate(
        class_id,
        {$push: {"lessons": {lesson_number: lesson_number, lesson_title: lesson_title, lesson_body: lesson_body}}},
        {safe: true, upsert: true},
        callback
    );
}

module.exports.register = function(info, callback){
   
    class_id = info['class_id'];
    
    student_username = info['student_username'];
    

    var query = {_id: class_id};
    
    Class.findOneAndUpdate(
        query,
        {$push: {"enrolled_students": { student_username: student_username}}},
        {safe: true, upsert: true},
        callback
    );
}

module.exports.addQuiz = function(info, callback)
{

    class_id = info['class_id']; 
   student_username = info['student_username']; 
    total = info['total'];
    obtained_marks = info['obtained_marks'];
    
    var query = {_id: class_id };
   
        Class.findOneAndUpdate(
            query,
            {$push: {"quiz": {student_username: student_username, total: total, obtained_marks: obtained_marks}}},
            {safe: true, upsert: true},
            callback
        );
    
   
    

}

module.exports.addMid = function(info, callback)
{

    class_id = info['class_id']; 
   student_username = info['student_username']; 
    total = info['total'];
    obtained_marks = info['obtained_marks'];
    
    var query = {_id: class_id };
   
        Class.findOneAndUpdate(
            query,
            {$push: {"mid": {student_username: student_username, total: total, obtained_marks: obtained_marks}}},
            {safe: true, upsert: true},
            callback
        );
    
   
    

}

module.exports.addFinal = function(info, callback)
{

    class_id = info['class_id']; 
   student_username = info['student_username']; 
    total = info['total'];
    obtained_marks = info['obtained_marks'];
    
    var query = {_id: class_id };
   
        Class.findOneAndUpdate(
            query,
            {$push: {"final": {student_username: student_username, total: total, obtained_marks: obtained_marks}}},
            {safe: true, upsert: true},
            callback
        );
    
   
    

}
module.exports.addAssignment = function(info, callback)
{

    class_id = info['class_id']; 
   student_username = info['student_username']; 
    total = info['total'];
    obtained_marks = info['obtained_marks'];
    
    var query = {_id: class_id };
   
        Class.findOneAndUpdate(
            query,
            {$push: {"assignment": {student_username: student_username, total: total, obtained_marks: obtained_marks}}},
            {safe: true, upsert: true},
            callback
        );
    
   
    

}

