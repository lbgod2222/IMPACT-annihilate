'use strict';

// This for the use of mailcheck
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MailCheck = new Schema({
  email: {
    type: String,
    required: [true, 'we need an email address']
  },
  authCode: String,
  // 1 hour in default
  expire: {
    type: Date,
    default: Date.now() + 3600000
  }
});

const mail = mongoose.model('mail', MailCheck);
module.exports = mail;