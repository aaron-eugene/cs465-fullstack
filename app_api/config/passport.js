/**
 * passport.js
 * ============
 *
 * Configures Passport local authentication strategy
 * for the Travlr application.
 *
 * Responsibilities:
 * - Authenticate users using email and password
 * - Validate credentials against MongoDB
 * - Delegate password verification to user model methods
 *
 * This configuration enables local authentication
 * using the passport-local strategy.
 */

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

// Ensure User model is registered
const Users = require("../models/user");
const User = mongoose.model("users");


/**
 * Local authentication strategy.
 *
 * Uses "email" as the username field.
 * Passport delegates credential validation
 * to the provided async verification function.
 */
passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},
		async (username, password, done) => {

			// Attempt to locate user by email
			const q = await User.findOne({ email: username }).exec();

			// User not found
			if (!q) {
				return done(null, false, {
					message: "Incorrect username.",
				});
			}

			// Password validation failed
			if (!q.validPassword(password)) {
				return done(null, false, {
					message: "Incorrect password.",
				});
			}

			// Authentication successful
			return done(null, q);
		}
	)
);
