// collect all the route pieces and 404 error handle page
const createError = require('http-errors');

// like this
const user = require('../app/routes/users');

module.exports = function(app) {
    // post interfaces
    app.get('/newUser', user.createUser);
    // get interfaces
    app.get('/user/:id', user.userInfo);

    // 404
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        console.log(res, 'this is error')
        res.status(err.status || 500);
        res.send('error');
    });
}