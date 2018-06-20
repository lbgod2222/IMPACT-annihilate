var express = require('express');
// var router = express.Router();

/* GET home page. */
// router.get('/hey', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send('respond with a resource');
// });

module.exports = app => {
  app.get('/hey', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.send('respond with a resource');
  });
}
