// const _ = require('lodash');
const nodemailer = require('nodemailer');

const config = {
  host: 'smtp.163.com',
  port: 25,
  auth: {
    user: 'lbgod2222@163.com',
    pass: 'lbgod2222'
  }
}

const baseInfo = {
  from: 'Impact Offcial <lbgod2222@163.com>',
}

const transporter = nodemailer.createTransport(config);

// info.response
module.exports = function(mail, cb) {
  mail = Object.assign(baseInfo, mail);
  transporter.sendMail(mail, (err, info) => {
    cb(err, info)
  });
};