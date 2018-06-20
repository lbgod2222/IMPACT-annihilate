const path = require('path');
// import env conf
const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

// commnet set here
const common = {
    root: path.join(__dirname, '..'),
    port: process.env.PORT||3007
}
module.exports = {
    development: Object.assign({}, development, common),
    test: Object.assign({}, test, common),
    production: Object.assign({}, production, common)
}[process.env.NODE_ENV || 'development']