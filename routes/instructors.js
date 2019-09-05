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
    cls_id = req.params.id; 
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

router.get('/classes/:id/addQuiz', function(req,res,next)
{
    Class.getclassById([req.params.id], function(err, classname)
    {
        if(err) throw err;
        res.render('instructors/newQuiz', {class: classname});
    });    

});
router.get('/classes/:id/addMid', function(req,res,next)
{
    Class.getclassById([req.params.id], function(err, classname)
    {
        if(err) throw err;
        res.render('instructors/newMid', {class: classname});
    });    

});
router.get('/classes/:id/addFinal', function(req,res,next)
{
    Class.getclassById([req.params.id], function(err, classname)
    {
        if(err) throw err;
        res.render('instructors/newFinal', {class: classname});
    });    

});
router.get('/classes/:id/addAssignment', function(req,res,next)
{
    Class.getclassById([req.params.id], function(err, classname)
    {
        if(err) throw err;
        res.render('instructors/newAssignment', {class: classname});
    });    

});


router.post('/classes/:id/newQuiz', function(req,res,next)
{
    
   
    Class.getclassById([req.params.id], function(err, classname)
  {
    var info = [];
    info['class_id'] = req.params.id;
    info['student_username'] = req.body.student_username;
    info['total'] = req.body.total;
    info['obtained_marks'] = req.body.obtained_marks;
    var info_student = [];
    info_student['class_id'] = req.params.id;
    info_student['class_title'] = req.body.class_title;
    info_student['student_username'] = req.body.student_username;
    info_student['total'] = req.body.total;
    info_student['obtained_marks'] = req.body.obtained_marks;
    var same_user = false;
    

      if(err) throw err;
      for(i=0; i<classname.quiz.length;i++)
        {
            if(classname.quiz[i].student_username == req.body.student_username){
                same_user = true;
            }
            
        }
        if(same_user){
            req.flash('error_msg', 'You have already graded this student');
        res.redirect('/instructors/classes');
        }
        else{
            Class.addQuiz(info, function(err, grade)
            {
                
                console.log('Class Grade Added....');
            });
            Student.addQuiz(info_student, function(err, grade)
            {
                console.log('Student Grade Added...');
            });
            req.flash('success_msg', 'grade added');
            res.send('grade added');

        }
        
  });
  
});


router.post('/classes/:id/newMid', function(req,res,next)
{
    
   
    Class.getclassById([req.params.id], function(err, classname)
  {
    var info = [];
    info['class_id'] = req.params.id;
    info['student_username'] = req.body.student_username;
    info['total'] = req.body.total;
    info['obtained_marks'] = req.body.obtained_marks;
    var info_student = [];
    info_student['class_id'] = req.params.id;
    info_student['class_title'] = req.body.class_title;
    info_student['student_username'] = req.body.student_username;
    info_student['total'] = req.body.total;
    info_student['obtained_marks'] = req.body.obtained_marks;
   
    
    var same_user = false;
    

      if(err) throw err;
      for(i=0; i<classname.mid.length;i++)
        {
            if(classname.mid[i].student_username == req.body.student_username){
                same_user = true;
            }
            
        }
        if(same_user){
            req.flash('error_msg', 'You have already graded this student');
        res.redirect('/instructors/classes');
        }
        else{
            Class.addMid(info, function(err, grade)
            {
                
                console.log('Class Grade Added....');
            });
            Student.addMid(info_student, function(err, grade)
            {
                console.log('Student Grade Added...');
            });
            req.flash('success_msg', 'grade added');
            res.send('grade added');

        }
        
  });
  
});

router.post('/classes/:id/newFinal', function(req,res,next)
{
    
   
    Class.getclassById([req.params.id], function(err, classname)
  {
    var info = [];
    info['class_id'] = req.params.id;
    info['student_username'] = req.body.student_username;
    info['total'] = req.body.total;
    info['obtained_marks'] = req.body.obtained_marks;
    
    var info_student = [];
    info_student['class_id'] = req.params.id;
    info_student['class_title'] = req.body.class_title;
    info_student['student_username'] = req.body.student_username;
    info_student['total'] = req.body.total;
    info_student['obtained_marks'] = req.body.obtained_marks;
   
    
    var same_user = false;
    

      if(err) throw err;
      for(i=0; i<classname.final.length;i++)
        {
            if(classname.final[i].student_username == req.body.student_username){
                same_user = true;
            }
            
        }
        if(same_user){
            req.flash('error_msg', 'You have already graded this student');
        res.redirect('/instructors/classes');
        }
        else{
            Class.addFinal(info, function(err, grade)
            {
                
                console.log('Class Grade Added....');
            });
            Student.addFinal(info_student, function(err, grade)
            {
                console.log('Student Grade Added...');
            });
            req.flash('success_msg', 'grade added');
            res.send('grade added');

        }
        
  });
  
});

router.post('/classes/:id/newAssignment', function(req,res,next)
{
    
   
    Class.getclassById([req.params.id], function(err, classname)
  {
    var info = [];
    info['class_id'] = req.params.id;
    info['student_username'] = req.body.student_username;
    info['total'] = req.body.total;
    info['obtained_marks'] = req.body.obtained_marks;
    var info_student = [];
    info_student['class_id'] = req.params.id;
    info_student['class_title'] = req.body.class_title;
    info_student['student_username'] = req.body.student_username;
    info_student['total'] = req.body.total;
    info_student['obtained_marks'] = req.body.obtained_marks;
   
    var same_user = false;
    

      if(err) throw err;
      for(i=0; i<classname.assignment.length;i++)
        {
            if(classname.assignment[i].student_username == req.body.student_username){
                same_user = true;
            }
            
        }
        if(same_user){
            req.flash('error_msg', 'You have already graded this student');
        res.redirect('/instructors/classes');
        }
        else{
            Class.addAssignment(info, function(err, grade)
            {
                
                console.log('Class Grade Added....');
            });
            Student.addAssignment(info_student, function(err, grade)
            {
                console.log('Student Grade Added...');
            });
            req.flash('success_msg', 'grade added');
            res.send('grade added');

        }
        
  });
  
});

module.exports = router;