const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Comment = require('../models/comment');
const Quicklad = require('../models/quicklad');
const Article = require('../models/article');
const chalk = require('chalk');
const { secret } = require('../utils/constant');
const { errCallback, getCallback, getCountCallback, postSuccessCallback } = require('../utils/unitcb');
const { dueSortby } = require('../utils/utils');

 /**
 * @api {get} /user/:uid 获取user信息
 * @apiName userInfo
 * @apiGroup User
 * 
 * @apiParam {ObjectId} uid user的ID
 */
exports.userInfo = function(req, res) {
  let { uid } = req.params;

  // User.findOne({'_id': uid}, (err, user) => {
  //   if (err) {
  //     errCallback(err, res);
  //   }
  //   getCallback(user, res);
  // })
  let populateQuery = 'lads articles';
  User.findOne({'_id': uid})
  .select('_id age articles comments cultivated email lads messages name')
  .populate(populateQuery)
  .exec((err, user) => {
    if (err) {
      errCallback(err, res);
    }
    getCallback(user, res);
  })
}

 /**
 * @api {get} /user/login 登陆验证user信息
 * @apiName login
 * @apiGroup User
 * 
 * @apiParam {String} username user的登录用户名
 * @apiParam {String} password user的登录密码
 * 
 * @apiSuccess (Success) UserId 验证成功
 * 
 * @apiError (Error) 5007 密码错误或账号不存在
 */
// TODO: errCallback 需要进一步操作
exports.login = function(req, res) {
  let { username, password } = req.query;

  User.findOne({'username': username}, (err, user) => {
    let cb = {};
    if (err) {
      errCallback(err, res);
    }
    if (user && User.schema.methods.encryptPassword(password, user.salt) === user.hashed_password) {
      let token = jwt.sign({
        _id: user._id
      }, secret, {
        expiresIn: '10h'
      })
      cb._id = user._id;
      cb.message = token;
      getCallback(cb, res);
    } else {
      cb.success = false;
      cb.message = '5007'
      errCallback(cb, res);
    }
  })
}

/**
 * @api {post} /user 创建user信息
 * @apiName createUser
 * @apiGroup User
 * 
 * @apiParam {String} username user的登录用户名
 * @apiParam {String} password user的登录密码
 * @apiParam {String} email user的验证邮箱
 * 
 * @apiSuccess (Success) 3007 注册账户成功
 * 
 * @apiError (Error) 5006 账户名不符合要求
 */
exports.createUser = function(req, res) {
  // adjust for payload
  let str = [];
  let finStr;
  req.on('data', (content) => {
    str.push(content);
  })
  req.on('end', () => {
    finStr = (Buffer.concat(str)).toString();
    let request = JSON.parse(finStr);
    request._id = new mongoose.Types.ObjectId();
  
    let user = new User(request);
    user.save(err => {
      if (err) {
        errCallback(err, res);
        return;
      }
      postSuccessCallback('3007', res);
    });
  })
}

/**
 * @api {put} /user/:uid 修改user信息
 * @apiName changeUser
 * @apiGroup User
 * 
 * @apiParam {String} password user的登录密码修改
 * @apiParam {String} name user的昵称
 * @apiParam {String} email user的电邮信息修改
 * @apiParam {String} age user年龄信息修改
 * 
 * @apiSuccess (Success) 3008 账户修改成功
 * 
 * @apiError (Error) 5006 账户名不符合要求
 * @apiError (Error) 5008 邮箱不符合要求
 * @apiError (Error) 5009 账户名不符合要求
 */

 // TODO: whether do timely check when change status?
exports.changeUser = function(req, res) {
  let token = req.headers.jwt;
  let { uid } = req.params;
  let str = [];
  let finStr;
  // let { password, email, age, name } = req.query
  let compose = {};

  if (req.errorInject) {
    return errCallback(req.errorInject, res);
  }

  req.on('data', (content) => {
    str.push(content);
  })
  req.on('end', () => {
    finStr = (Buffer.concat(str)).toString();
    let request = JSON.parse(finStr)
    let { password, email, age, name } = request
    
    if (password) {
      compose.password = password;
    }
    if (name) {
      compose.name = name;
    }
    if (email) {
      compose.email = email;
    }
    if (age) {
      compose.age = age;
    }
  
    User.findByIdAndUpdate(uid, compose, (err, cb) => {
      if (err) {
        errCallback(err, res);
        return;
      }
      postSuccessCallback('3008', res);
    });
  })

  // if (req.errorInject) {
  //   return errCallback(req.errorInject, res);
  // }
  
  // if (password) {
  //   compose.password = password;
  // }
  // if (name) {
  //   compose.name = name;
  // }
  // if (email) {
  //   compose.email = email;
  // }
  // if (age) {
  //   compose.age = age;
  // }

  // console.log('compose content:', compose)
  // User.findByIdAndUpdate(uid, compose, (err, cb) => {
  //   if (err) {
  //     errCallback(err, res);
  //     return;
  //   }
  //   postSuccessCallback('3008', res);
  // });
}

/**
 * @api {put} /user/:uid/:target 更新user链接信息
 * @apiName updateContent
 * @apiGroup User
 * 
 * @apiParam {ObjectId} uid user的ID
 * @apiParam {String} target 欲更新的字段
 * @apiParam {ObjectId} content 欲更新的内容[articls/cultivated/comments/lads/messages]
 * @apiParam {String} logic 欲更新的方式(+ / -)
 * 
 * @apiSuccess (Success) 3009 更新数据成功
 * 
 * @apiError (Error) 5010 更新对象错误
 */

exports.updateContent = function(req, res) {
  let { uid, target } = req.params;
  let { content, logic } = req.body;
  let targetMap = [
    'articls',
    'cultivated',
    'comments',
    'lads',
    'messages'
  ];
  let compose = {}
  let after = {}
  let token = req.header.jwt;

  if (req.errorInject) {
    return errCallback(req.errorInject, res);
  }
  
  if (!traget || targetMap.indexOf(traget) < 0) {
    errCallback('5010', res);
  }

  compose[target] = content

  if (logic === '+') {
    after = {
      $push: compose
    }
  } else {
    after = {
      $pull: compose
    }
  }
  
  User.findByIdAndUpdate(uid, after, (err, cb) => {
    if (err) {
      errCallback(err, res);
      return;
    }
    postSuccessCallback('3009', res);
  })
}