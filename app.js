const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// local treat
const fs = require('fs');
const join = require('path').join;
const logger = require('morgan');
const config = require('./config');
const models = require('app/models');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// bootstrap models for mongeese
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// bootstrap routes
require('./config/routes')(app);

module.exports = app;

// DO a long-living running staff
connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .on('open', listen)

// functions
function connectDb() {
  var option = {
    server: {
      socketOption: {
        keepAlive: 1
      }
    }
  };
  return mongoose.connect(config.db, option).connection;
}

function listen() {
  if (app.get('env' === 'test')) {
    return;
  }
  app.listen(config.port);
  console.log(`This server is running at port ${config.port}`);
}