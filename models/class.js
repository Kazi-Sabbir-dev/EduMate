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
    //Array of objects
    lessons:[{
        lesson_number: {type: Number},
        lesson_title: {type: String},
        lesson_body: {type: String}
    }]
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