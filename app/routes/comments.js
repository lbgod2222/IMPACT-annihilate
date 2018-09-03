const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Comment = require('../models/comments');
const Article = require('../models/article');
const { errCallback, getCallback, getCountCallback, postSuccessCallback } = require('../utils/unitcb');
const { dueSortby } = require('../utils/utils');

// GET
// Query for comment
// Params: { offset / limit / sortBy }
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

// POST
// Write comment
exports.postComment = function(req, res) {
  let request;
  let aid;
  console.log(chalk.green('WRITING COMMENTS'));
  request = req.body;
  request._id = new mongoose.Types.ObjectId();
  aid = req.params.aid;
  let comment = new Comment(request)
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