const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
// local treat
const fs = require('fs');
const join = require('path').join;
const logger = require('morgan');
const config = require('./config');
const models = join(__dirname ,'app/models');
const mailer = require('./app/utils/mailer');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// set Access-Control-Allow-Origin
app.all('*', function(req,  res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST,GET");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with,Content-Type");
  next();
})

// bootstrap models for mongeese
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// bootstrap routes
require('./config/routes')(app);

// get locale SSL key

module.exports = app;

// DO a long-living running staff
// connectDb()
//   .on('error', console.log)
//   .on('disconnected', connectDb)
//   .on('open', listen)

// functions
// function connectDb() {
var option = {
  server: {
    socketOption: {
      keepAlive: true
    }
  }
};
mongoose.connect(config.db, option).then(
  () => {
   listen();
  },
  err => {
    console.log('Connect error!');
  }
);
// }

function listen() {
  if (app.get('env' === 'test')) {
    return;
  }
  app.listen(config.port);
  console.log(`This server is running at port ${config.port}`);
}