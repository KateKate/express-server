var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);
app.use('/users', users);

// Validate unique START
app.get('/registrations/validate/:field?/:value?', function (req,res) {
  var field = req.params.field,
      value = req.params.value,
      result = false;
  if (field=='username' && value=='kate') {
    result = true;
  }
  if (field=='email' && value=='kate@kate.com') {
    result = true;
  }
  var key = field + '_exists';
  var object = {};
  object[key] = result;
  res.json(object);
  res.send();
});
// Validate unique END

app.post('/registrations', function (req,res) {
  var username = req.body.username,
    email = req.body.email,
    valid = true,
    usernameMessage = '',
    emailMessage = '',
    generalError = '';
  if (username == 'kate' || username == 'kate1') {
    valid = false;
    usernameMessage = 'Please enter unique value';
  }
  if (email == 'kate@kate.com' || email == 'kate1@kate1.com') {
    valid = false;
    emailMessage = 'Please enter unique value';
  }
  if (username == 'general') {
    valid = false;
    generalError = 'Some problems with general username';
  }
  var response = {
    'valid': valid,
    'username': usernameMessage,
    'email': emailMessage,
    'general_error': generalError,
  }
  res.json(response);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
