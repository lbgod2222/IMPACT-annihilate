const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Comment = require('../models/comment');
const User = require('../models/user');
const Article = require('../models/article');
const { errCallback, getCallback, getCountCallback, postSuccessCallback } = require('../utils/unitcb');
const { dueSortby } = require('../utils/utils');

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
  
  console.log('get comments', aid, count)
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
  Comment.find({aid: aid}).
  populate({
    path: 'replies',
    model: Comment,
    options: {limit: limit}
  }).
  populate({
    path: 'creator',
    model: User
    // options: {limit: limit}
  }).
  exec((err, comment) => {
    if (err) {
      console.log(err)
    }
    console.log(comment)
    data = comment;
    getCountCallback(data, count, res);
  });
}

/**
 * @api {post} /comments/:aid 发布评论
 * @apiName postComment
 * @apiGroup Comment
 * @apiParam {ObjectId} aid 目标文章的ObjectId
 * @apiParam {ObjectId} content content 内容
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
  request.aid = aid
  let comment = new Comment(request)
  if (request.creator) {
    if (req.errorInject) {
      return errCallback(req.errorInject, res);
    }
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
      postSuccessCallback('3001', res);
    }
  })
}


/**
 * @api {put} /comments/:cid 修改评论
 * @apiName changeComment
 * @apiGroup Comment
 * @apiParam {ObjectId} cid 目标评论的ObjectId
 * @apiParam {ObjectId} uid 目标评论的UID
 * @apiParam {String} content 回复内容
 * 
 * @apiError (Error) 5001 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * 
 * @apiSuccess (Success) 3002 修改评论成功
 */
exports.changeComment = function(req, res) {
  let cid = req.params.cid;
  let uid = req.body.uid;
  let content = req.query.content;
  let token = req.header.jwt;
  
  if (uid) {
    if (req.errorInject) {
      return errCallback(req.errorInject, res);
    }
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
    postSuccessCallback('3002', res);
  });
}

/**
 * @api {post} /comments/reply/:cid 回复评论
 * @apiName writeReply
 * @apiGroup Comment
 * @apiParam {ObjectId} cid 目标评论的ObjectId
 * @apiParam {ObjectId} uid 目标评论的UID
 * @apiParam {String} content 回复内容
 * 
 * @apiError (Error) 5001 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * 
 * @apiSuccess (Success) 3010 发布评论回复成功
 */
exports.writeReply = function(req, res) {

  let { cid } = req.params;
  let { uid, content } = req.body;
  let token = req.header.jwt;
  let request = {};
  
  request.creator = uid;
  request.content = content;
  request._id = new mongoose.Types.ObjectId();
  let comment = new Comment(request);

  if (req.errorInject) {
    return errCallback(req.errorInject, res);
  }
  
  comment.save(function(err) {
    if (err) {
      errCallback(err, res);
      return
    } else {
      Comment.findByIdAndUpdate(cid, {$push: {replies: request._id}}, function (err, com) {
        if (err) {
          errCallback(err);
          return
        }
      })
      postSuccessCallback('3010', res);
    }
  })
}