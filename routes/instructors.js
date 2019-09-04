var express = require('express');
var router = express.Router();

Class = require('../models/class');
Instructor = require('../models/instructor');
User = require('../models/user');
Student = require('../models/student');

router.get('/classes', function(req,res,next){
    Instructor.getInstructorByUsername(req.user.username, function(err, instructor){

        if(err) throw err;
        res.render('instructors/classes', { instructor: instructor});
    });
});

router.post('/classes/:id/register', function(req,res)
{   
    
  Class.getclassById([req.params.id], function(err, classname)
  {
      if(err) throw err;
     var class_code = classname.class_code;

    if(class_code == req.body.class_code){
        info = [];
        info['instructor_username'] = req.user.username;
        info['class_id'] = req.body.class_id;
        info['class_title'] = req.body.class_title;
    
        Instructor.register(info, function(err, instructor)
        {
            if(err) throw err;
            console.log(instructor);
        });
        req.flash('success_msg', 'You are now registered to teach this class');
        res.redirect('/instructors/classes');
    }
    else{
        req.flash('error_msg', 'You are not assigned instructor for this class');
     res.redirect('/class');
    }
    
    
  });
    
   
}

);

router.get('/classes/:id/lessons/new', function(req,res,next){
    res.render('instructors/newlesson', {class_id: req.params.id});
});

router.post('/classes/:id/lessons/new', function(req,res,next)
{   
    // get values
    var info =[];
    info['class_id']  = req.params.id;
    info ['lesson_number'] = req.body.lesson_number;
    info['lesson_title'] = req.body.lesson_title;
    info['lesson_body'] = req.body.lesson_body;
    

    Class.addLesson(info, function(err, lesson){
            console.log('Lesson Added..');
    });
    req.flash('success_msg', 'Lesson Added');
    res.redirect('/instructors/classes');
});

router.get('/classes/:id/grades', function(req,res,next)
{
    Class.getclassById([req.params.id], function(err, classname)
    {
        if(err) throw err;
        res.render('instructors/newgrade', {class: classname});
    });    

});

router.post('/classes/:id/grades', function(req,res,next)
{
    
   
    Class.getclassById([req.params.id], function(err, classname)
  {
    var info = [];
    info['class_id'] = req.params.id;
    info['student_username'] = req.body.student_username;
    info['quiz'] = req.body.quiz;
    info['mid'] = req.body.mid;
    info['final'] = req.body.final;
    info['assignment'] = req.body.assignment;
    var same_user = false;

      if(err) throw err;
      for(i=0; i<classname.grades.length;i++)
        {
            if(classname.grades[i].student_username == req.body.student_username){
                same_user = true;
            }
            
        }
        if(same_user){
            req.flash('error_msg', 'You have already graded this student');
        res.redirect('/instructors/classes');
        }
        else{
            Class.addGrade(info, function(err, grade)
            {
                
                console.log('Class Grade Added....');
            });
            Student.addGrade(info, function(err, grade)
            {
                console.log('Student Grade Added...');
            });
            req.flash('success_msg', 'Grade Added');
            res.redirect('/instructors/classes');

        }
        
  });
  
});


// if grade already exsits


module.exports = router;