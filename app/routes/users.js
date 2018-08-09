var express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const chalk = require('chalk');
// var router = express.Router();

// module.exports = router;

exports.userInfo = function(req, res) {
  console.log(chalk.blue('below is req'));
  // 如果在schema里面明示 这里就会默式转换
  let age = Number(req.params.id)
  console.log(typeof age);
    let that = this;
    User.find({age: age}, function(err, docs) {
      console.log(age);
      if (err) {
        console.log(chalk.red('ERROR DURING QUERY'));
      }
      res.send(docs);
  })
}

exports.createUser = function(req, res) {
  console.log(req, 'this is params from api2')
  let obj = req.body
  res.send(obj)
  console.log('user save func')
}