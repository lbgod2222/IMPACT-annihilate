const path = require('path');
// import env conf
const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

// commnet set here
const comment = {
    root: path.join(__dirname, '..')
}

module.exports = {
    development: Object.assign({}, development, comment),
    test: Object.assign({}, test, comment),
    production: Object.assign({}, production, comment),
    port: process.env.PORT || 3000
}[process.env.NODE_ENV || 'development']