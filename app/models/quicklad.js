'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quickladSchema = new Schema({
  content: String,
  color: String,
  createdTime: {
    type: Date,
    default: Date.now(),
    required: [true, '5003']
  },
  lastModified: { type: Date, default: Date.now() },
  tempNick: String,
  creator: { type: Schema.Types.ObjectId, ref: 'user' }
});

// Validations
// validate: now can reveive array
quickladSchema.path('content').validate((v) => {
  if (v.length > 225 || v.length < 1) {
    throw new Error('5001');
  }
  return true;
}, 'fail at valid content');

quickladSchema.path('color').validate((v) => {
  let list = ['red', 'purple', 'green', 'black', 'blue', 'yellow']
  if (list.findIndex(e => {return e === v}) < 0) {
    throw new Error('5002');
  }
  return true;
}, 'fail at valid color');
const quicklad = mongoose.model('quicklad', quickladSchema);
module.exports = quicklad