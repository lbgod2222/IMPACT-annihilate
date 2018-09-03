const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Quicklad = require('../models/quicklad');
const { errCallback, getCallback, getCountCallback, postSuccessCallback } = require('../utils/unitcb');
const { dueSortby } = require('../utils/utils');

// GET
// Query for lads
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

// Query for colord lads
exports.getColorLads = (req, res) => {
	let count, data;
	let { offset, limit, sortBy } = req.query;
  let col = req.params.color;
  offset = Number(offset);
  limit = Number(limit);
  console.log(offset, limit, sortBy, col);

	// Get filted number
	// Quicklad.count({'color': col}, (err, num) => {
	// 	if (err) {
	// 		errCallback(err, res);
	// 	}
	// 	count = num;
	// })
	
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
  // exec((err, lads) => {
  //   if (err) {
  //     errCallback(err, res);
  //   }
  //   data = lads;
  //   getCountCallback(data, count, res);
  // })

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


// POST
// write lads
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