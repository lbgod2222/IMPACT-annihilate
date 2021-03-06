// collect all the route pieces and 404 error handle page
const createError = require('http-errors');
const chalk = require('chalk');

// like this
const user = require('../app/routes/users');
const article = require('../app/routes/articles');
const comment = require('../app/routes/comments');
const quicklad = require('../app/routes/quicklads');
const mail = require('../app/routes/mails');
const { authPost } = require('../app/middlewares/authPost');

module.exports = function(app) {
  app.use(authPost);
  // below are test for example
  // login user
  app.get('/user/login', user.login);
  // post interfaces
  app.post('/user', user.createUser);
  // get interfaces
  app.get('/user/:uid', user.userInfo);
  // change user info
  app.put('/user/:uid', user.changeUser);

  // ARTICLE
  // read somebody's article list
  app.get('/articles/:uid', article.userArticleList);
  // read article list
  app.get('/articles', article.articleList);
  // read article detail
  app.get('/article/:aid', article.article);
  // post article
  app.post('/article', article.writeArticle);
  // adjust article
  app.put('/article/adjust/:aid', article.changeArticle);
  // vote article
  app.put('/article/vote/:aid', article.voteArticle);

  // COMMENTS
  // read comment
  app.get('/comments/:aid', comment.getComments);
  // post comment
  app.post('/comment/:aid', comment.postComment);
  // adjust comment
  app.put('/comments/:cid', comment.changeComment);
  // write reply
  app.post('/comments/reply/:cid', comment.writeReply);
  
  // LADS
  // read all lads
  app.get('/lads', quicklad.getAllLads);
  // read colored lads
  app.get('/lads/:color', quicklad.getColorLads);
  // post lads
  app.post('/lad', quicklad.postLabs);
  // change lads
  app.put('/lads/:id', quicklad.changeLad);
  // search lads content
  app.get('/search', quicklad.searchLad);

  // MAIL
  // send valid mail & store in db
  app.get('/mailValid', mail.mailValid);
  // valid code
  app.get('/checkValid', mail.checkValid);
  
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
    console.log(chalk.cyan(err, '---upper is error'));
    res.status(err.status || 500);
    res.send('error');
  });
}