/**
 * travel.js
 * =========
 *
 * Controller for the Travel page.
 *
 * Responsibilities:
 * - Retrieve trip data from the REST API
 * - Validate API response format
 * - Render the travel view with trip data
 * - Provide user-facing message if data is unavailable
 *
 * This controller consumes the internal API rather than
 * accessing the database directly.
 */

const tripsEndpoint = "http://localhost:3000/api/trips";

/**
 * HTTP request configuration for API call.
 */
const options = {
	method: "GET",
	headers: {
		Accept: "application/json",
	},
};

/**
 * GET /travel
 *
 * Fetches trip data from the API and renders the travel view.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const travel = async function (req, res, next) {
	
	await fetch(tripsEndpoint, options)
		.then((res) => res.json())
		.then((json) => {
			
			let message = null;
			
			// Ensure API response is an array
			if (!(json instanceof Array)) {
				message = "API lookup error";
				json = [];
			} 
			// Handle empty result set
			else if (!json.length) {
					message = "No trips exist in our database!";
			}
			
			// Render travel view with data
			res.render("travel", { 
				title: "Travlr Getaways", 
				trips: json, 
				message 
			});
		})
		
		.catch((err) => res.status(500).send(err.message));
};

// Export controller function for route binding
module.exports = {
	travel,
};
