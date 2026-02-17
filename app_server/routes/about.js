/**
 * about.js (Server Routes)
 * =========================
 *
 * Defines route handling for the About page.
 *
 * Responsibilities:
 * - Map the /about route to its controller
 * - Delegate rendering logic to the about controller
 */

var express = require('express');
var router = express.Router();

// Import About controller
var controller = require('../controllers/about');

/**
 * GET /about
 *
 * Invokes the about controller to render the About page.
 */
router.get('/', controller.about);

// Export configured router for mounting in app.js
module.exports = router;
