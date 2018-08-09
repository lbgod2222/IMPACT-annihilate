'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import comment from './comment'

const ArticleSchema = new Schema({
  title: String,
  author: String,
  content: String,
  lastModified: {type: Date, default: Date.now},
  // comments collections refs
  comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
  meta: {
    votes: Number
  }
});

// Validations
const article = mongoose.model('article', ArticleSchema);
module.exports = article