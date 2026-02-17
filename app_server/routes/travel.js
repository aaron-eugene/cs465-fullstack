/**
 * travel.js (Server Routes)
 * ==========================
 *
 * Defines routing for the Travel page.
 *
 * Responsibilities:
 * - Map the /travel route to its controller
 * - Delegate data retrieval and rendering logic
 *   to the travel controller
 */

var express = require('express');
var router = express.Router();

// Import Travel controller
var controller = require('../controllers/travel');

/**
 * GET /travel
 *
 * Invokes the travel controller to retrieve trip data
 * and render the Travel page.
 */
router.get('/', controller.travel);

// Export configured router for mounting in app.js
module.exports = router;
