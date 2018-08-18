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
  status: Schema.Types.ObjectId,
  content: String,
  replies: [
    {
      // name for both logined & unlogined
      name: '',
      content: String,
      createdTime: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdTime: {
    type: Date,
    default: Date.now
  }
});


// TODO: Validations
const comment = mongoose.model('comment', CommentSchema);
module.exports = comment