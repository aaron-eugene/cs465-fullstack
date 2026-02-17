/**
 * index.js (Server Routes)
 * =========================
 *
 * Defines routing for the homepage.
 *
 * Responsibilities:
 * - Map the root route ("/") to the main controller
 * - Delegate rendering logic to the homepage controller
 */

var express = require('express');
var router = express.Router();

// Import main controller
const ctrlMain = require('../controllers/main');

/**
 * GET /
 *
 * Invokes the main controller to render the homepage.
 */
router.get('/', ctrlMain.index);

// Export configured router for mounting in app.js
module.exports = router;
