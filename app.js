/**
 * app.js
 * ======
 *
 * Main Express application configuration file.
 *
 * Responsibilities:
 * - Configure middleware
 * - Register view engine (Handlebars)
 * - Connect to MongoDB
 * - Mount server and API routes
 * - Enable CORS for Angular admin application
 * - Initialize authentication (Passport)
 * - Define global error handling
 *
 * This file serves as the central composition root
 * of the Travlr application.
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('hbs');

// Load environment variables from .env
require('dotenv').config();

// Wire in Passport authentication module
var passport = require('passport');
require('./app_api/config/passport');

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

app.set('views', path.join(__dirname, 'app_server', 'views'));

handlebars.registerPartials(
	path.join(__dirname, 'app_server', 'views', 'partials')
);

app.set('view engine', 'hbs');

/***********************************************************
* Middleware Configuration
************************************************************/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport authentication middleware
app.use(passport.initialize());

/***********************************************************
* CORS Configuration
************************************************************/

/**
 * Enables cross-origin requests from Angular development server.
 * Adds Authorization header support for JWT authentication.
 */
app.use('/api', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
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

// Catch unauthorized JWT errors and return 401
app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res
			.status(401)
			.json({ "message": err.name + ": " + err.message });
	}
	next(err);
});

// Global error handler
app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
