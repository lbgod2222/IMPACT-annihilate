const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Comment = require('../models/comments');
const Article = require('../models/article');
const { errCallback, getCallback, getCountCallback, postSuccessCallback } = require('../utils/unitcb');
const { dueSortby, validateAuth } = require('../utils/utils');

/**
 * @apiDefine Pagination
 * @apiParam {Number} offset (分页) 请求的起始位置。
 * @apiParam {Number} limit (分页) 请求单次个数。
 * @apiParam {String} sortBy (分页) 请求的排序方式。
 */

/**
 * @apiError
 * (Quicklad) 5001 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * (Quicklad) 5002 Quick 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list) 
 * (Quicklad) 5003 Quick 必需创建时间(quicklad need createdTime) 
 */


/**
 * @api {get} /comments/:aid 请求所有评论
 * @apiName getComments
 * @apiGroup Comment
 * @apiUse Pagination
 * @apiParam {ObjectId} aid 目标文章的ObjectId
 */
exports.getComments = function(req, res) {
  let count;
  let data;
  let { offset, limit, sortBy } = req.query;
  let { aid } = req.params
  
  // Get Total count
  Comment.estimatedDocumentCount(function(err, num) {
    if (err) {
      errCallback(err, res);
      return
    }
    count = num;
  });
  offset = Number(offset);
  limit = Number(limit);
  Article.find({_id: aid}).
  populate({
    path: 'comments',
    // model: 'comment',
    options: {limit: limit}
  }).
  exec((err, comment) => {
    data = comment;
    getCountCallback(data, count, res);
  });
}

/**
 * @api {post} /comments/:aid 发布评论
 * @apiName postComment
 * @apiGroup Comment
 * @apiParam {ObjectId} aid 目标文章的ObjectId
 * @apiParam {ObjectId} content 目标文章的ObjectId
 * @apiParam {Date} createdTime comment创建时间
 * @apiParam {String} tempNick comment显示昵称(未登录情况下)
 * @apiParam {ObjectId} creator comment创造者的ID(登录情况下)
 * 
 * @apiError (Error) 5001 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * @apiError (Error) 5005 内容长度应小于35并大于1
 * 
 * @apiSuccess (Success) 3001 发布评论成功
 */
exports.postComment = function(req, res) {
  let request;
  let aid;
  let token = req.header.jwt
  request = req.body;
  request._id = new mongoose.Types.ObjectId();
  aid = req.params.aid;
  let comment = new Comment(request)
  if (request.creator) {
    validateAuth(token, request.creator, res);
  }
  comment.save(function(err) {
    if (err) {
      errCallback(err, res);
      return
    } else {
      Article.findByIdAndUpdate(aid, {$push: {comments: request._id}}, function (err, com) {
        if (err) {
          errCallback(err);
          return
        }
      })
      postSuccessCallback('post comment success', res);
    }
  })
}


/**
 * @api {put} /comments/:cid 修改评论
 * @apiName putReply
 * @apiGroup Comment
 * @apiParam {ObjectId} cid 目标评论的ObjectId
 * @apiParam {ObjectId} uid 目标评论的UID
 * @apiParam {String} content 回复内容
 * 
 * @apiError (Error) 5001 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * 
 * @apiSuccess (Success) 3002 修改评论成功
 */
exports.putReply = function(req, res) {
  let cid = req.params.cid;
  let uid = req.body.uid;
  let content = req.query.content;
  let token = req.header.jwt;
  
  if (uid) {
    validateAuth(token, uid, res);
  }
  let compose = {'lastModified': Date.now()};
  if (content) {
    compose.content = content
  }
  Comment.findOneAndUpdate({'_id': cid}, compose, (err, cb) => {
    if (err) {
      errCallback(err, res);
      return
    }
    postSuccessCallback('change comment success', res);
  });
}

/**
 * @api {post} /comments/reply/:cid 修改评论
 * @apiName putReply
 * @apiGroup Comment
 * @apiParam {ObjectId} cid 目标评论的ObjectId
 * @apiParam {ObjectId} uid 目标评论的UID
 * @apiParam {String} content 回复内容
 * 
 * @apiError (Error) 5001 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * 
 * @apiSuccess (Success) 3010 发布评论回复成功
 */

let { cid } = req.params;
let { uid, content } = req.body;
let token = req.header.jwt;
let request = {};

request.creator = uid;
request.content = content;
validateAuth(token, uid, res);
request._id = new mongoose.Types.ObjectId();
let comment = new Comment(request);

comment.save(function(err) {
  if (err) {
    errCallback(err, res);
    return
  } else {
    Comment.findByIdAndUpdate(cid, {$push: {replies: req.body._id}}, function (err, com) {
      if (err) {
        errCallback(err);
        return
      }
    })
    postSuccessCallback('post reply success', res);
  }
})