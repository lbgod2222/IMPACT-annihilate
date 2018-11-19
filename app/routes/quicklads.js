const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Quicklad = require('../models/quicklad');
const User = require('../models/user');
const { errCallback, getCallback, getCountCallback, postSuccessCallback } = require('../utils/unitcb');
const { dueSortby } = require('../utils/utils');


/**
 * @apiDefine Pagination
 * @apiParam {Number} offset (分页) 请求的起始位置。
 * @apiParam {Number} limit (分页) 请求单次个数。
 * @apiParam {String} sortBy (分页) 请求的排序方式。
 */

/**
 * @apiSuccess
 * (Quicklad) 2001 Quicklad 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * (Quicklad) 5002 Quicklad 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list) 
 * (Quicklad) 5003 Quicklad 必需创建时间(quicklad need createdTime) 
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
 * @apiParam {ObjectId} uid Quicklad创造者的ID
 * @apiParam {String} content Quicklad更改后的内容
 * @apiParam {String} color Quicklad更改后的颜色
 * 
 * @apiError (Error) 5001 Quicklad 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * @apiError (Error) 5002 Quicklad 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list) 
 * 
 * @apiSuccess (Success) 3004 Quicklad 修改成功 
 */
exports.changeLad = function(req, res) {
  let token = req.header.jwt;
  let lid = req.params.id;
  let { content, color, uid } = req.body
  
  if (req.errorInject) {
    return errCallback(req.errorInject, res);
  }

  let compose = {'lastModified': Date.now()}
  if (content) {
    compose.content = content
  }
  if (color) {
    compose.color = color
  }
  Quicklad.findOneAndUpdate({'_id': lid}, compose, (err, lad) => {
    if (err) {
      errCallback(err, res);
      return
    }
    postSuccessCallback('3004', res);
  });
}

/**
 * @api {post} /lads 发布Quicklad
 * @apiName postLabs
 * @apiGroup Quicklad
 * @apiParam {String} content Quicklad内容
 * @apiParam {String} color Quicklad颜色
 * @apiParam {Date} createdTime Quicklad创建时间
 * @apiParam {Date} lastModified Quicklad上次修改时间
 * @apiParam {String} tempNick Quicklad显示昵称(未登录情况下)
 * @apiParam {ObjectId} creator Quicklad创造者的ID(登录情况下)
 * 
 * @apiError (Error) 5001 Quicklad 内容长度应小于225并大于1(quicklad content should less than 225 chars & more than 1)
 * @apiError (Error) 5002 Quicklad 的颜色属性应该在列表中选择('red', 'purple', 'green', 'black', 'blue', 'yellow')(quicklad color should be on the list) 
 * @apiError (Error) 5003 Quicklad 必需创建时间(quicklad need createdTime) 
 * 
 * @apiSuccess (Success) 3003 Quicklad 发布成功 
 */
exports.postLabs = function(req, res) {
  let request = req.body;
  let token = req.header.jwt;
  let quicklad = new Quicklad(request);
  request._id = new mongoose.Types.ObjectId();

  if (req.errorInject) {
    return errCallback(req.errorInject, res);
  }

  quicklad.save(function(err) {
    if (err) {
      errCallback(err, res);
      return
    } else {
      if (request.creator) {
        User.findByIdAndUpdate(request.creator, {$push: {
          'lads': request._id
        }}, )
      }
      postSuccessCallback('3003', res);
    }
  })
}