const Mail = require('../models/mail');
const { errCallback, postSuccessCallback } = require('../utils/unitcb');
const mailer = require('../utils/mailer');
const Crypto = require('crypto');

 /**
 * @api {get} /mailValid/:address 向目标邮箱发送邮件
 * @apiName mailValid
 * @apiGroup Mail
 * 
 * @apiParam {String} address 邮箱地址
 * 
 * @apiSuccess (Success) 3011 发送成功
 */

exports.mailValid = function(req, res) {
  let { address } = req.query;
  let validCode;
  Crypto.randomBytes(20, (err, buf) => {
    validCode = buf.toString('hex');
    console.log('foremost:')
    mailer({
      to: address,
      subject: 'Impact： 验证码',
      html: `<h1>这是您的验证码，有效期为1小时：</h1>
      <br />
      <strong>${validCode}<strong>
      `
    }, (err, info) => {
      console.log('get in before')
      if (err) {
        console.log('get in err before')
        errCallback(err, res);
        return
      }
      console.log('get in after')
      // before check dump
      Mail.findOne({'email': address}, (err, mail) => {
        console.log('get in 2 find func')
        if (mail === null) {
          let mail = new Mail({
            email: address,
            authCode: validCode,
            expire: Date.now() + 360000
          });
          mail.save(err => {
            console.log('get in mail saved func')
            if (err) {
              errCallback(err, res);
              return;
            }
            return postSuccessCallback('3011', res);
          })
        } else {
          console.log('get in else func')
          let mailUpdate = {
            expire: Date.now() + 360000,
            authCode: validCode
          }
          Mail.findOneAndUpdate({'email': address}, mailUpdate, (err, cb) => {
            console.log('get in find one func')
            if (err) {
              errCallback(err, res);
              return
            }
            return postSuccessCallback('3011', res);
          });
        }
      });
    });
  });
};

 /**
 * @api {get} /checkValid 校验验证码并且清楚缓存邮箱对
 * @apiName checkValid
 * @apiGroup Mail
 * 
 * @apiParam {String} authCode 验证码
 * @apiParam {String} address 邮箱地址
 * 
 * @apiSuccess (Success) 3012 验证通过
 * 
 * @apiError (Error) 5013 验证未通过
 */

exports.checkValid = function(req, res) {
  let { address, authCode } = req.query;
  console.log('query:', req.query);
  Mail.findOne({'email': address}, (err, mail) => {
    if (err) {
      errCallback(err, res);
    }
    if (mail && mail.authCode === authCode) {
      console.log('PLUS!')
      Mail.deleteOne({'email': address}, (err, mail) => {
        if (err) {
          errCallback(err, res);
        }
        postSuccessCallback('3012', res);
      });
    } else {
      errCallback('5013', res);
    }
  });
}