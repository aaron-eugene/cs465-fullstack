/**
 * main.js
 * ========
 *
 * Controller for the homepage.
 *
 * Responsibilities:
 * - Render the main landing page
 * - Provide view-level data (e.g., page title)
 *
 * This controller supports server-rendered pages using Handlebars.
 */

 /**
 * GET /
 *
 * Renders the homepage view.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const index = (req, res) => {
	res.render('index', { title: "Travlr Getaways"});
};

// Export controller function for route binding
module.exports = {
	index
}
