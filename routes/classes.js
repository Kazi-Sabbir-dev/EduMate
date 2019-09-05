var express = require('express');
var router = express.Router();
var Classes = require('../models/class');
/* GET classes page. */

router.get('/', function(req, res, next) {
 Classes.getClasses(function(err,classes)
 {
     if(err) throw err;
  res.render('Classes/index', { classes: classes });
  console.log(Classes.class_code);
 });
  
});
//get class by id 
router.get('/:id/details', function(req, res, next) {
    Classes.getclassById([req.params.id],function(err,classname)
    {
        if(err) throw err;
     res.render('Classes/details', { class: classname });
    });
     
   });

router.get('/:id/lessons', function(req,res,next)
{
    Classes.getclassById([req.params.id],function(err, classname)
    {
        if(err) throw err;
        res.render('Classes/lessons', { class: classname });
    });
});

router.get('/:id/lessons/:lesson_id', function(req,res,next)
{
    Classes.getclassById([req.params.id], function(err, classname)
    {
        var lesson;
        if(err) throw err;
        for(i=0; i<classname.lessons.length;i++)
        {
            if(classname.lessons[i].lesson_number == req.params.lesson_id){
                lesson = classname.lessons[i];
            }
        }
        res.render('Classes/lesson', {class: classname, lesson: lesson});
    });
});

router.get('/:id/grades', function(req,res,next)
{
    Classes.getclassById([req.params.id],function(err, classname)
    {
        if(err) throw err;
        res.render('Classes/grades', { class: classname });
    });
});

router.get('/:id/quizGrade', function(req,res,next)
{
    Classes.getclassById([req.params.id],function(err, classname)
    {
        if(err) throw err;
        res.render('Classes/quiz', { class: classname });
    });
});
router.get('/:id/midGrade', function(req,res,next)
{
    Classes.getclassById([req.params.id],function(err, classname)
    {
        if(err) throw err;
        res.render('Classes/mid', { class: classname });
    });
});
router.get('/:id/finalGrade', function(req,res,next)
{
    Classes.getclassById([req.params.id],function(err, classname)
    {
        if(err) throw err;
        res.render('Classes/final', { class: classname });
    });
});
router.get('/:id/assignmentGrade', function(req,res,next)
{
    Classes.getclassById([req.params.id],function(err, classname)
    {
        if(err) throw err;
        res.render('Classes/assignment', { class: classname });
    });
});


   


module.exports = router;