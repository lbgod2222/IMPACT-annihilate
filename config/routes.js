// collect all the route pieces and 404 error handle page
const createError = require('http-errors');
const chalk = require('chalk');

// like this
const user = require('../app/routes/users');
const article = require('../app/routes/articles');
const comment = require('../app/routes/comments');
const quicklad = require('../app/routes/quicklads');

module.exports = function(app) {
    // below are test for example
    // login user
    app.put('/user/login', user.login)
    // post interfaces
    app.post('/user', user.createUser);
    // get interfaces
    app.get('/user/:uid', user.userInfo);

    // ARTICLE
    // read somebody's article list
    app.get('articles/:uid', article.userArticleList);
    // read article list
    app.get('/articles', article.articleList);
    // read article detail
    app.get('/article/:aid', article.article);
    // post article
    app.post('/article', article.writeArticle);
    // adjust article
    app.put('/article/adjust/:aid', article.changeArticle);

    // COMMENTS
    // read comment
    app.get('/comments/:aid', comment.getComments);
    // post comment
    app.post('/comment', comment.postComment);
    // adjust comment
    app.put('/comments/:cid', comment.changeComment);
    // write reply
    app.put('/comments/reply/:cid', comment.writeReply);
    
    // LADS
    // read all lads
    app.get('/lads', quicklad.getAllLads);
    // read colored lads
    app.get('/lads/:color', quicklad.getColorLads);
    // post lads
    app.post('/lad', quicklad.postLabs);
    // change lads
    app.put('/lads/:id', quicklad.changeLad);

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