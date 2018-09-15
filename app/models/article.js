'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'quicklad need createdTime']
  },
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
  seed: {
    type: Schema.Types.ObjectId,
    ref: 'quicklad'
  }
});

// Validations
const errorArea = 'fail at valid article'

ArticleSchema.path('title').validate((v) => {
  if (v.length > 50 || v.length < 1) {
    throw new Error('5004');
  }
  return true;
}, errorArea);

ArticleSchema.path('content').validate((v) => {
  if (v.length > 31000 || v.length < 1) {
    throw new Error('5005');
  }
  return true;
}, errorArea);
const article = mongoose.model('article', ArticleSchema);
module.exports = article