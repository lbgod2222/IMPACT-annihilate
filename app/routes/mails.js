const Mail = require('../models/article');
const { errCallback, postSuccessCallback } = require('../utils/unitcb');
const mailer = require('../utils/mailer');

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
  let address = req.params;
  let validCode;
  Crypto.randomBytes(20, (err, buf) => {
    validCode = buf.toString('hex');

    mailer({
      to: address,
      subject: 'Impact： 验证码',
      html: `<h1>这是您的验证码，有效期为1小时：</h1>
      <br />
      <strong>${validCode}<strong>
      `
    }, (err, info) => {
      if (err) {
        return errCallback(err, res);
      }
      let mail = new Mail({
        email: address,
        authCode: validCode,
        expire: Date.now
      });
      mail.save(err => {
        if (err) {
          errCallback(err, res);
          return;
        }
        return postSuccessCallback('3011', res);
      })
    });
  });
};

 /**
 * @api {get} /checkValid 向目标邮箱发送邮件
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
  Mail.findOne({'email': address}, (err, mail) => {
    if (err) {
      errCallback(err, res);
    }
    if (mail.authCode === authCode) {
      Mail.deleteOne({'email': address}, (err, mail) => {
        if (err) {
          errCallback(err, res);
        }
        return postSuccessCallback('3012', res);
      });
    } else {
      return errCallback('5013', res);
    }
  });
}