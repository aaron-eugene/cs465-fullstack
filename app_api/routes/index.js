const express = require("express");
const router = express.Router();

// Import the controllers we will route
const tripsController = require("../controllers/trips");

// Define route for trips endpoint
router
	.route("/trips")
	.get(tripsController.tripsList);
	
// Route tripsFindByCode - requires parameter
router
	.route('/trips/:tripCode')
	.get(tripsController.tripsFindByCode);

module.exports = router;
