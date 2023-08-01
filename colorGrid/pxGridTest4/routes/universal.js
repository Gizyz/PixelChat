var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {

    res.send(`404 page not found`);
  });

  module.exports = router;
