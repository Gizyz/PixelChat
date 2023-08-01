var express = require('express');
var router = express.Router();

let i = 0;
/* GET users listing. */
router.get('/', function(req, res, next) {
  i = 1
  res.status(200).json({info: 'preset text' + i});
});

module.exports = router;
