'use strict';

const regs = require('../utils/validators');

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;
const oAuthTypes = [
  'github',
  'twitter',
  'facebook',
  'google',
  'linkedin'
];

/**
 * User Schema
 */

// TODO: rethink of this schema
const UserSchema = new Schema({
  name: { type: String, default: ''},
  email: { type: String, default: '', unique: true },
  username: { type: String, default: '', unique: true },
  age: {type: Number, default: null},
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  // articles area
  articles: [{ type: Schema.Types.ObjectId, ref: 'article'}],
  // caltivated area
  cultivated: [{ type: Schema.Types.ObjectId, ref: 'cultivated'}],
  // comments area
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  // lads area
  lads: [{ type: Schema.Types.ObjectId, ref: 'quicklad' }],
  // Message box
  messages: [{ type: Object, default: {}}]
});

const validatePresenceOf = value => value && value.length;

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally
// 'path' means the base argument of one schema
// validate reassign a function & require a boolean return

// UserSchema.path('name').validate(function (name) {
//   if (this.skipValidation()) return true;
//   return name.length;
// }, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return regs.email(email);
}, '5008');

UserSchema.path('email').validate(function (email) {
  const User = mongoose.model('User');
  if (this.skipValidation()) return(true);
  
  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      if (!err && users.length === 0) {
        return false
      };
    });
  } else return true;
}, 'Email already exists');

UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true;
  return regs.username(username);
}, '5006');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length && this._password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();
  
  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

/**
 * Methods
 * can be used as this.func()
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password, salt) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt || salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function () {
    return ~oAuthTypes.indexOf(this.provider);
  }
};

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

// mongoose.model('User', UserSchema);
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;