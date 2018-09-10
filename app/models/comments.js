'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import article from './article'

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
      // replay only for logined user
      name: '',
      content: String,
      createdTime: {
        type: Date,
        default: Date.now()
      }
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
    throw new Error('quicklad content should less than 225 chars & more than 1');
  }
  return true;
}, errorArea);

CommentSchema.path('tempNick').validate((v) => {
  if (v.length > 35 || v.length < 1) {
    throw new Error('quicklad content should less 35 chars & more than 1');
  }
  return true;
}, errorArea);

const comment = mongoose.model('comment', CommentSchema);
module.exports = comment