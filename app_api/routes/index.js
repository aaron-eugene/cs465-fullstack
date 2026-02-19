/**
 * index.js (API Routes)
 * ======================
 *
 * Defines REST API routes for the Travlr application.
 *
 * Responsibilities:
 * - Map HTTP endpoints to controller functions
 * - Separate routing logic from business logic
 * - Define authentication endpoints
 */

const express = require("express");
const router = express.Router();

/***********************************************************
* Controller Imports
************************************************************/

// Trip controller functions
const tripsController = require("../controllers/trips");

// Authentication controller functions
const authController = require("../controllers/authentication");

// JSON Web Token package
const jwt = require("jsonwebtoken");

/***********************************************************
* JWT Authentication Middleware
************************************************************/

/**
 * authenticateJWT
 * ----------------
 * Middleware function that validates a JSON Web Token
 * provided in the Authorization header.
 *
 * If valid:
 *   - Decoded token is attached to req.auth
 *   - Request proceeds to next middleware/controller
 *
 * If invalid or missing:
 *   - Returns HTTP 401 Unauthorized
 */
function authenticateJWT(req, res, next)
{
	const authHeader = req.headers["authorization"];

	if (authHeader == null)
	{
		console.log("Authorization header missing");
		return res.sendStatus(401);
	}

	const headers = authHeader.split(" ");

	if (headers.length < 2)
	{
		console.log("Malformed Authorization header");
		return res.sendStatus(401);
	}

	const token = headers[1];

	if (token == null)
	{
		console.log("Bearer token missing");
		return res.sendStatus(401);
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, verified) =>
	{
		if (err)
		{
			console.log("Token validation error");
			return res.sendStatus(401);
		}

		// Attach decoded token payload to request
		req.auth = verified;

		// Continue to protected controller
		next();
	});
}

/***********************************************************
* Trip Routes
************************************************************/

/**
 * /api/trips
 *
 * GET  - Retrieve all trips (public)
 * POST - Create a new trip (requires authentication)
 */
router
	.route("/trips")
	.get(tripsController.tripsList)
	.post(authenticateJWT, tripsController.tripsAddTrip);

/**
 * /api/trips/:tripCode
 *
 * GET - Retrieve trip(s) by trip code (public)
 * PUT - Update existing trip (requires authentication)
 */
router
	.route("/trips/:tripCode")
	.get(tripsController.tripsFindByCode)
	.put(authenticateJWT, tripsController.tripsUpdateTrip);

/***********************************************************
* Authentication Routes
************************************************************/

/**
 * /api/register
 *
 * POST - Register new user and return JWT
 */
router
	.route("/register")
	.post(authController.register);

/**
 * /api/login
 *
 * POST - Authenticate existing user and return JWT
 */
router
	.route("/login")
	.post(authController.login);

/***********************************************************
* Module Exports
************************************************************/

// Export configured router for mounting in app.js.
module.exports = router;
