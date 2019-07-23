var express = require('express');
var router = express.Router();
var Classes = require('../models/class');
/* GET classes page. */
router.get('/', function(req, res, next) {
 Classes.getClasses(function(err,classes)
 {
  res.render('classes', { classes: classes });
 },3);
  
});

module.exports = router;