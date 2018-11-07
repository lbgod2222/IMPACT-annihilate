const jwt = require('jsonwebtoken');
const { errCallback } = require('../utils/unitcb');
const { secret } = require('../utils/constant');

exports.authPost = function(req, res, next) {
  let str = req.headers.jwt;
  let uid = req.headers.uid;
  jwt.verify(str, secret, (err, decoded) => {
    if (err || decoded._id !== uid) {
      req.errorInject = err
    } else {
      req.errorInject = null
    }
    next();
  })
}