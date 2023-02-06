// Boilerplate setup
var createError = require('http-errors');

// Gzip Compress
// https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
const compression = require('compression')
// CORS
var cors = require('cors')
var express = require('express');
var app = express()
app.use(compression())
app.use(cors)

var path = require('path');
var cookieParser = require('cookie-parser');

// Logging
var logger = require('morgan');
logger('tiny')

// Router setup
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// body-parser
var bodyParser = require('body-parser')

// Router setup
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// Security
const helmet = require('helmet')
app.use(helmet())
app.disable('x-powered-by')

// CORS




// Hello World setup
const hostname = process.env.YOUR_HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;
const http = require("http");
const server = http.createServer(app);


// Check if running local or on server
server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
  if (hostname == "0.0.0.0" && PORT === "4000" ) {
    console.log('Server running locally');
  } else {
    console.log('Server running externally');
  }
});
