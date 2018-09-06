'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quickladSchema = new Schema({
  content: String,
  color: String,
  createdTime: {type: Date, default: Date.now()},
  lastModified: {type: Date, default: Date.now()},
  tempNick: String,
  creator: {type: Schema.Types.ObjectId, ref: 'user'}
});

// Validations
const quicklad = mongoose.model('quicklad', quickladSchema);
module.exports = quicklad