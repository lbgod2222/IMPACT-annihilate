const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Quicklad = require('../models/quicklad');
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
 * (Quicklad) 5001 Quicklad 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * (Quicklad) 5002 Quick 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list) 
 * (Quicklad) 5003 Quick 必需创建时间(quicklad need createdTime) 
 */

/**
 * @api {get} /lads 请求所有Quicklad
 * @apiName getAllLads
 * @apiGroup Quicklad
 * @apiUse Pagination
 */
exports.getAllLads = function(req, res) {
  let count, data;
  let { offset, limit, sortBy } = req.query;
  
  // Get Total count
  Quicklad.estimatedDocumentCount(function(err, num) {
    if (err) {
      errCallback(err, res);
      return
    }
    count = num;
  });
  offset = Number(offset);
  limit = Number(limit);
  Quicklad.find({}).
  skip(offset).
  limit(limit).
  sort(dueSortby(sortBy)).
  exec((err, quicklads) => {
		if (err) {
      errCallback(err, res);
      return
		}
    data = quicklads;
    getCountCallback(data, count, res);
  })
}

/**
 * @api {get} /lads/:color 根据color请求所有Quicklad
 * @apiName getColorLads
 * @apiGroup Quicklad
 * @apiUse Pagination
 * @apiParam {String} color 在(red/purple/green/black/blue/yellow)中选择
 */
exports.getColorLads = (req, res) => {
	let count, data;
	let { offset, limit, sortBy } = req.query;
  let col = req.params.color;
  offset = Number(offset);
  limit = Number(limit);
  console.log(offset, limit, sortBy, col);

  Quicklad.find({color: col}).
  skip(offset).
  limit(limit).
  sort(dueSortby(sortBy)).
  count((err, num) => {
    if (err) {
      errCallback(err, res);
      return
		}
		count = num;
  });

  Quicklad.find({color: col}).
  skip(offset).
  limit(limit).
  sort(dueSortby(sortBy)).
  exec((err, lads) => {
    if (err) {
      errCallback(err, res);
      return
		}
    data = lads;
    getCountCallback(data, count, res);
  });
}

/**
 * @api {put} /lads/:id 修改Quicklad内容
 * @apiName changeLad
 * @apiGroup Quicklad
 * @apiParam {ObjectId} id Quicklad创造者的ID
 * @apiParam {String} content Quicklad更改后的内容
 * @apiParam {String} color Quicklad更改后的颜色
 */
exports.changeLad = function(req, res) {
  let request;
  console.log(chalk.green('PUT LADS'));
  let lid = req.params.id;
  let { content, color } = req.body
  console.log(chalk.green(content, color, lid));
  
  let compose = {'lastModified': Date.now()}
  if (content) {
    compose.content = content
  }
  if (color) {
    compose.color = color
  }
  let after = {
    $set: compose
  }
  console.log(after);
  Quicklad.findOneAndUpdate({'_id': lid}, after,(err, lad) => {
    if (err) {
      errCallback(err, res);
      return
    }
    postSuccessCallback('change lad success', res);
  })
}

/**
 * @api {post} /lads 发布Quicklad
 * @apiName postLabs
 * @apiGroup Quicklad
 * @apiParam {String} content Quicklad内容
 * @apiParam {String} color Quicklad颜色
 * @apiParam {Date} createdTime Quicklad创建时间
 * @apiParam {Date} createdTime Quicklad创建时间
 * @apiParam {Date} lastModified Quicklad上次修改时间
 * @apiParam {String} tempNick Quicklad显示昵称(未登录情况下)
 * @apiParam {ObjectId} creator Quicklad创造者的ID(登录情况下)
 */
exports.postLabs = function(req, res) {
  let request;
  console.log(chalk.green('WRITING LADS'));
  request = req.body;
  let quicklad = new Quicklad(request);

  quicklad.save(function(err) {
    if (err) {
      errCallback(err, res);
      return
    } else {
      postSuccessCallback('post lads success', res);
    }
  })
}