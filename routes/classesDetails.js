var express = require('express');
var router = express.Router();
var Classes = require('../models/class');


router.get('/', function(req, res, next) {
    Classes.getclassById([req.params.id],function(err,classname)
    {
        if(err) throw err;
     res.render('Classes/details', { class: classname });
    });
     
   });
   


module.exports = router;