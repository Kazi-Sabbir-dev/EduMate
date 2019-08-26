var express = require('express');
var router = express.Router();
var Classes = require('../models/class');
/* GET classes page. */

router.get('/', function(req, res, next) {
 Classes.getClasses(function(err,classes)
 {
     if(err) throw err;
  res.render('Classes/index', { classes: classes });
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
        res.render('Classes/lessons', {class: classname});
    });
});


   


module.exports = router;