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

// Import Trip controller functions
const tripsController = require("../controllers/trips");

// Import Authentication controller functions
const authController = require("../controllers/authentication");

/**
 * /api/trips
 *
 * GET  - Retrieve all trips
 * POST - Create a new trip
 */
router
	.route("/trips")
	.get(tripsController.tripsList)
	.post(tripsController.tripsAddTrip);

/**
 * /api/trips/:tripCode
 *
 * GET - Retrieve trip(s) by trip code
 * PUT - Update existing trip
 */
router
	.route("/trips/:tripCode")
	.get(tripsController.tripsFindByCode)
	.put(tripsController.tripsUpdateTrip);

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
	.route('/login')
	.post(authController.login);

// Export configured router for mounting in app.js.
module.exports = router;
