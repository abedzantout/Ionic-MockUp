let express      = require('express');
let path         = require('path');
let favicon      = require('serve-favicon');
let logger       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let routes       = require('./routes/index');
let auth = require('./routes/auth');
let store = require('./routes/store');
let uploader = require('./routes/upload');
let app          = express();
// view engine setup
app.set('views', path.join(__dirname, '../client/dist'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/', routes);
app.use('/', auth);
app.use('/', store);
app.use('/', uploader);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err    = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if ( app.get('env') === 'development' ) {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error  : err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error  : {}
    });
});
module.exports = app;
