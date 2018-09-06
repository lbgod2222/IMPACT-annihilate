'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import comment from './comment'

const ArticleSchema = new Schema({
  title: String,
  author: String,
  content: String,
  lastModified: {type: Date, default: Date.now()},
  // comments collections refs
  comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
  meta: {
    tags: {type: Array, default: []},
    votes: {type: Number, default: 0},
    // cultivated: means who collect it, for the hot ratio reason (if we have)
    // will be increase / decrease if someone collect it or reverse
    cultivated: {type: Number, default: 0}
  },
  // Origin article ignore, but the article from lad should use it
  seed: {}
});

// Validations
const article = mongoose.model('article', ArticleSchema);
module.exports = article