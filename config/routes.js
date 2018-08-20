// collect all the route pieces and 404 error handle page
const createError = require('http-errors');
const chalk = require('chalk');

// like this
const user = require('../app/routes/users');
const article = require('../app/routes/articles');

module.exports = function(app) {
    // below are test for example
    // post interfaces
    app.post('/newUser', user.createUser);
    // get interfaces
    app.get('/user/:id', user.userInfo);
    // below are what i want

    // read article list
    app.get('/articles', article.articleList);
    // read article detail
    app.get('/article/:id', article.article);

    // post article
    app.post('/article', article.writeArticle);

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
        // console.log(res);
        console.log(chalk.cyan(err, '---upper is error'));
        res.status(err.status || 500);
        res.send('error');
    });
}