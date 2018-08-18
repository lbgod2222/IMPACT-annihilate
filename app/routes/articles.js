const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Article = require('../models/article');
const { errCallback, getCallback, getCountCallback, postSuccessCallback } = require('../utils/unitcb');
const { dueSortby } = require('../utils/utils');

// GET Routes with more than one action using bulkWrite([options])

// Query for article list
// Params: { offset / limit / sortBy }
exports.articleList = function(req, res) {
  let count;
  let data;
  let errMsg;
  Article.estimatedDocumentCount(function(err, num) {
    if (err) {
      errCallback(err, res);
      return
    }
    count = num;
  });
  let { offset, limit, sortBy } = req.query;
  offset = Number(offset);
  limit = Number(limit);
  Article.find({}).
  skip(offset).
  limit(limit).
  sort(dueSortby(sortBy)).
    exec((err, article) => {
      data = article;
      getCountCallback(data, count, res);
    });
}

// POST Routes1

exports.writeArticle = function(req, res) {
  console.log(chalk.green('WRITING INFOS'));
  let article = new Article(req.body)
  article.save(function(err) {
    if (err) {
      errCallback(err, res);
    } else {
      postSuccessCallback('post success', res);
    }
  });
}