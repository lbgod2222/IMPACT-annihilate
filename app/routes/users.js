var express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
// var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

exports.userInfo = function(req, res) {
  var resObj = {
    success: true,
    informations: [
      {
        name: 'str',
        age: 12,
        gender: 'male'
      },
      {
        name: 'func',
        age: 24,
        gender: 'female'
      }
    ]
  }
  res.json(resObj)
}

exports.createUser = function(req, res) {
  console.log(req.query, 'this is params from api2')
  let obj = req.query
  let cb = res
  let transObj = {
    name: obj.name,
    email: obj.email,
    username: obj.username,
    password: obj.password
  }
  const user = new User(transObj)
  user.save(function(err) {
    if (err) {
      cb.send(err)
    }
    cb.json('Success?')
  })
  console.log('user save func')
}