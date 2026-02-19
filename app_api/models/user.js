/**
 * user.js
 * =========
 *
 * Defines the Mongoose schema and model for application users.
 *
 * Responsibilities:
 * - Store user identity information
 * - Securely manage password hashing and validation
 * - Generate JSON Web Tokens for authenticated users
 *
 * This model supports local authentication using
 * cryptographic hashing and JWT-based authorization.
 */

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/**
 * User Schema
 *
 * Fields:
 * - email: Unique identifier for login (required)
 * - name: Display name for the user (required)
 * - hash: Hashed password value (derived using PBKDF2)
 * - salt: Cryptographic salt used to generate password hash
 *
 * Plain-text passwords are never stored.
 */
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	hash: String,
	salt: String
});

/**
 * setPassword(password)
 *
 * Generates a cryptographically secure salt and derives
 * a password hash using PBKDF2 with SHA-512.
 *
 * @param {String} password - Plain-text password to hash
 */
userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(
		password,
		this.salt,
		1000,
		64,
		'sha512'
	).toString('hex');
};

/**
 * validPassword(password)
 *
 * Compares a provided password with the stored hash.
 *
 * @param {String} password - Plain-text password to verify
 * @returns {Boolean} True if password matches stored hash
 */
userSchema.methods.validPassword = function(password) {
	const hash = crypto.pbkdf2Sync(
		password,
		this.salt,
		1000,
		64,
		'sha512'
	).toString('hex');

	return this.hash === hash;
};

/**
 * generateJWT()
 *
 * Creates a signed JSON Web Token for the user.
 *
 * Payload includes:
 * - _id
 * - email
 * - name
 *
 * Token expires in 1 hour.
 *
 * @returns {String} Signed JWT
 */
userSchema.methods.generateJWT = function() {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			name: this.name
		},
		process.env.JWT_SECRET,
		{ expiresIn: '1h' }
	);
};

/**
 * Register and export the User model.
 * Collection name: "users"
 */
const User = mongoose.model('users', userSchema);
module.exports = User;