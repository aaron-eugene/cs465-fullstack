/**
 * about.js
 * =========
 *
 * Controller for the About page.
 *
 * Responsibilities:
 * - Render the About view
 * - Provide view-level data (e.g., page title)
 *
 * This controller supports server-rendered pages using Handlebars.
 */

/**
 * GET /about
 *
 * Renders the About page view.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const about = (req, res) => {
	res.render('about', { title: 'About Us' });
};

// Export controller function for route binding
module.exports = {
	about
};
