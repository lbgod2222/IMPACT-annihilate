const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
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
 * @api {get} /articles 获取所有articles
 * @apiName articleList
 * @apiGroup Article
 * @apiUse Pagination
 * 
 * @apiParam {String} tags article的标签
 */
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
  Article.find(queryData, ['_id', 'title', 'author', 'meta', 'lastModified']).
  skip(offset).
  limit(limit).
  sort(dueSortby(sortBy)).
  exec((err, article) => {
    data = article;
    getCountCallback(data, count, res);
  });
}

 /**
 * @api {get} /articles/:uid 获取所有articles
 * @apiName userArticleList
 * @apiGroup Article
 * @apiUse Pagination
 * 
 * @apiParam {ObjectId} uid 发布者的ID
 */
exports.userArticleList = function(req, res) {
  let count;
  let data;

  let { uid } = req.params;
  Article.count({'author': uid}, (err, num) => {
    if (err) {
      errCallback(err, res);
    }
    count = num;
  })
  Article.find({'author': uid}, ['_id', 'title', 'author', 'meta', 'lastModified']).
  skip(offset).
  limit(limit).
  sort(dueSortby(sortBy)).
  exec((err, article) => {
    if (err) {
      errCallback(err, res);
    }
    data = article;
    getCountCallback(data, count, res);
  });
}

 /**
 * @api {get} /article/:aid 获取article详情
 * @apiName article
 * @apiGroup Article
 * 
 * @apiParam {ObjectId} aid 文章ID
 */
exports.article = function(req, res) {
  let data;
  let { aid } = req.params;
  Article.find({_id: aid}).
  exec((err, article) => {
    if (err) {
      errCallback(err, res);
      return
    }
    data = article;
    getCallback(data, res);
  })
}

 /**
 * @api {post} /article 发布article
 * @apiName writeArticle
 * @apiGroup Article
 * @apiUse Pagination
 * 
 * @apiParam {String} title article的标题部分
 * @apiParam {ObjectId} author (可选) article的发布者
 * @apiParam {String} content article的内容
 * @apiParam {Date} lastModified article上次修改时间
 * @apiParam {String} tags article上次修改时间
 * @apiParam {ObjectId} seed (可选)article诞生自哪个种子
 * 
 * @apiError (Error) 5004 article标题长度应小于50且大于1
 * @apiError (Error) 5005 article内容长度应小于31000且大于1
 * 
 * @apiSuccess (Success) 3005 article发布成功
 */
exports.writeArticle = function(req, res) {
  let request;
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
      postSuccessCallback('3005', res);
    }
  });
}

 /**
 * @api {put} /article/:aid 修改article内容
 * @apiName changeArticle
 * @apiGroup Article
 * @apiUse Pagination
 * 
 * @apiParam {String} title article的标题部分
 * @apiParam {String} content article的内容
 * @apiParam {Date} lastModified article上次修改时间
 * @apiParam {String} tags article上次修改时间
 * 
 * @apiError (Error) 5004 article标题长度应小于50且大于1
 * @apiError (Error) 5005 article内容长度应小于31000且大于1
 * 
 * @apiSuccess (Success) 3006 article修改成功
 */

 exports.changeArticle = function(req, res) {
  let { title, content, tags } = req.body;
  let { aid } = req.params;
  let compose = {'lastModified': Date.now()}
  if (title) {
    compose.title = title;
  }
  if (content) {
    compose.content = content;
  }
  if (tags) {
    compose.tags = tags;
  }
  
  Article.findOneAndUpdate({'_id': aid}, compose, (err, cb) => {
    if (err) {
      errCallback(err, res);
      return
    }
    postSuccessCallback('3006', res);
  })
}