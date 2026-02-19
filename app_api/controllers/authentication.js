/**
 * authentication.js
 * ==================
 *
 * Controller for user authentication operations.
 *
 * Responsibilities:
 * - Handle user registration
 * - Generate JSON Web Tokens for authenticated users
 */

const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/user");

/**
 * POST /api/register
 *
 * Registers a new user and returns a JSON Web Token.
 *
 * @param {Object} req - Express request object containing name, email, and password
 * @param {Object} res - Express response object
 * @returns {JSON} JWT token for authenticated user or error message
 */
const register = async (req, res) => {

	// Ensure required fields are provided
	if (!req.body.name || !req.body.email || !req.body.password) {
		return res
			.status(400)
			.json({ "message": "All fields required" });
	}

	// Create new user record
	const user = new User({
		name: req.body.name,
		email: req.body.email
	});

	// Set encrypted password
	user.setPassword(req.body.password);

	// Save user to database
	const q = await user.save();

	// If save fails
	if (!q) {
		return res
			.status(400)
			.json({ "message": "Unable to register user" });
	}

	// Generate JWT for newly registered user
	const token = user.generateJWT();

	// Return token to caller
	return res
		.status(200)
		.json(token);
};

/**
 * POST /api/login
 *
 * Authenticates an existing user and returns a JSON Web Token.
 *
 * @param {Object} req - Express request object containing email and password
 * @param {Object} res - Express response object
 * @returns {JSON} JWT token or authentication error
 */
const login = (req, res) => {

	// Ensure required fields are provided
	if (!req.body.email || !req.body.password) {
		return res
			.status(400)
			.json({ "message": "All fields required" });
	}

	// Delegate authentication to passport module
	passport.authenticate('local', (err, user, info) => {

		// Error in authentication process
		if (err) {
			return res
				.status(404)
				.json(err);
		}

		// Authentication succeeded
		if (user) {
			const token = user.generateJWT();
			return res
				.status(200)
				.json({ token });
		}

		// Authentication failed
		return res
			.status(401)
			.json(info);

	})(req, res);
};

// Export controller methods.
module.exports = {
	register,
	login
};
