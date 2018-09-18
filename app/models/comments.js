'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  // DBref to article collection
  article: {
    type: Schema.Types.ObjectId,
    ref: 'article'
  },
  // For unlogined user
  tempNick: String,
  // For future logined user
  creator: { type: Schema.Types.ObjectId, ref: 'user' },
  content: String,
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
  createdTime: {
    type: Date,
    default: Date.now()
  }
});


// Validations
const errorArea = 'fail at valid comment'

CommentSchema.path('content').validate((v) => {
  if (v.length > 225 || v.length < 1) {
    throw new Error('5001');
  }
  return true;
}, errorArea);

CommentSchema.path('tempNick').validate((v) => {
  if (v.length > 35 || v.length < 1) {
    throw new Error('5005');
  }
  return true;
}, errorArea);

const comment = mongoose.model('comment', CommentSchema);
module.exports = comment