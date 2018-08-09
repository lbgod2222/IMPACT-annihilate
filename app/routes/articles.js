var express = require('express');
const mongoose = require('mongoose');
const Article = require('../models/article');
const chalk = require('chalk');

// GET Routes

// Query for article list
// Params: { offset / limit }
exports.articleList = function(req, res) {
  console.log(chalk.blue('below is req'));
}

// POST Routes