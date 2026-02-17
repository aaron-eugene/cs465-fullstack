/**
 * app.js
 * ======
 * 
 * Main Express application configuration file.
 * 
 * This file:
 * - Configures middleware
 * - Registers view engine (Handlebars)
 * - Connects to the MongoDB database
 * - Mounts server-side and API routes
 * - Enables CORS for the Angular admin application
 * - Defines global error handling
 * 
 * This serves as the central composition root of the Travlr application.
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('hbs');

/***********************************************************
* Route Definitions
************************************************************/

// Server-rendered routes (Handlebars views)
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var aboutRouter = require('./app_server/routes/about');

// REST API routes
var apiRouter = require('./app_api/routes/index');

/***********************************************************
* Database Initialization
************************************************************/
   
// Establish MongoDB connection via Mongoose
require('./app_api/models/db');

/***********************************************************
* Express App Initialization
************************************************************/

var app = express();

/***********************************************************
* View Engine Configuration
************************************************************/

// Set location of server-side views
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register handlebars partial templates
handlebars.registerPartials(
	path.join(__dirname, 'app_server', 'views', 'partials')
);

// Set Handlebars as the templating engine
app.set('view engine', 'hbs');

/***********************************************************
* Middleware Configuration
************************************************************/

// HTTP request logger
app.use(logger('dev'));

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Parse cookies
app.use(cookieParser());

// Serve static assets from /public
app.use(express.static(path.join(__dirname, 'public')));

/***********************************************************
* CORS Configuration
************************************************************/

/**
 * Enables cross-origin requests from the Angular development server.
 * This allows the Angular admin application (running on port 4200)
 * to communicate with the Express API (port 3000).
 */
app.use('/api', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	next();
});

/***********************************************************
* Route Mounting
************************************************************/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/about', aboutRouter);
app.use('/api', apiRouter);

/***********************************************************
* Error Handling
************************************************************/

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Global error handler
app.use(function(err, req, res, next) {
  
  // Provide detailed error info in development only
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error view
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
