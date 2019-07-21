var express = require('express');
var router = express.Router();

/* GET grades page. */
router.get('/', function(req, res, next) {
  res.render('grades', { title: 'EduMate' });
});

module.exports = router;
