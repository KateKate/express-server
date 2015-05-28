var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var field = request.params.field;
  console.log(field);
  var object = { email_exists: false };
  res.json(object);
});

module.exports = router;
