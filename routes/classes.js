var express = require('express');
var router = express.Router();

/* GET classes page. */
router.get('/', function(req, res, next) {
  res.render('classes', { title: 'EduMate' });
});

module.exports = router;