/**
 * index.js (API Routes)
 * =====================
 *
 * Defines REST API routes for the Travlr application.
 *
 * Responsibilities:
 * - Map HTTP endpoints to controller functions
 * - Separate routing logic from business logic
 *
 * All route handlers are implemented in the controllers directory.
 */

const express = require("express");
const router = express.Router();

// Import Trip controller functions
const tripsController = require("../controllers/trips");

/**
 * /api/trips
 *
 * GET    - Retrieve all trips
 * POST   - Create a new trip
 */
router
	.route("/trips")
	.get(tripsController.tripsList)
	.post(tripsController.tripsAddTrip);
	
/**
 * /api/trips/:tripCode
 *
 * GET    - Retrieve trip(s) by trip code
 * PUT    - Update existing trip
 */
router
	.route('/trips/:tripCode')
	.get(tripsController.tripsFindByCode)
	.put(tripsController.tripsUpdateTrip);

// Export configured router for mounting in app.js.
module.exports = router;
