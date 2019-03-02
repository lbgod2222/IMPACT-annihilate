// const _ = require('lodash');
const nodemailer = require('nodemailer');

const config = {
  host: 'smtp.163.com',
  port: 465,
  secureConnection: true,
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
  console.log('get in mailer func')
  console.log('get in massage:', mail)
  mail = Object.assign(baseInfo, mail);
  console.log('after mail:', mail)
  transporter.sendMail(mail, (err, info) => {
    console.log('may be error', err, '+++++info:', info)
    cb(err, info)
  });
};