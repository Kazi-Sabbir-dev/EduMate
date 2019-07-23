var express = require('express');
var router = express.Router();
const Class = require('../models/class');
/* GET home page. */
router.get('/', function(req, res, next) {
 
    
    res.render('index');

 
});

module.exports = router;
