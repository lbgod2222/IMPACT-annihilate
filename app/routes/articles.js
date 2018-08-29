const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Article = require('../models/article');
const { errCallback, getCallback, getCountCallback, postSuccessCallback } = require('../utils/unitcb');
const { dueSortby } = require('../utils/utils');

// GET Routes with more than one action using bulkWrite([options])

// Query for article list
// Params: { offset / limit / sortBy }
// more: now only accept $and query & all
exports.articleList = function(req, res) {
  let count;
  let data;
  let queryData = {};
  let { offset, limit, sortBy } = req.query;
  
  if (req.query.tags) {
    let obj = []
    let paraArr = req.query.tags.split(',');
    paraArr.forEach(e => {
      let temp = {}
      temp['meta.tags'] = e
      obj.push(temp);
    });
    queryData = {
      $and: obj
    }
    Article.count(queryData, function(err, num) {
      count = num;
    });
    console.log(queryData);
  } else {
    Article.estimatedDocumentCount(function(err, num) {
      if (err) {
        errCallback(err, res);
        return
      }
      count = num;
    });
  }
  offset = Number(offset);
  limit = Number(limit);
  Article.find(queryData, ['title', 'author', 'meta', 'lastModified']).
  skip(offset).
  limit(limit).
  sort(dueSortby(sortBy)).
  exec((err, article) => {
    data = article;
    getCountCallback(data, count, res);
  });
}

// Query for article detail
exports.article = function(req, res) {
  let data;
  let { id } = req.params;
  Article.find({_id: id}).
  exec((err, article) => {
    if (err) {
      errCallback(err, res);
      return
    }
    data = article;
    getCallback(data, res);
  })
}

// POST Routes1

exports.writeArticle = function(req, res) {
  let request;
  console.log(chalk.green('WRITING INFOS'));
  request = req.body;
  if (req.body.tags) {
    request.meta = {};
    request.meta.tags = req.body.tags.split(',');
    delete request.tags;
  }
  let article = new Article(request);
  article.save(function(err) {
    if (err) {
      errCallback(err, res);
    } else {
      postSuccessCallback('post success', res);
    }
  });
}