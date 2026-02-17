/**
 * seed.js
 * ========
 *
 * Seeds the MongoDB database with initial trip data.
 *
 * Responsibilities:
 * - Establish database connection
 * - Remove existing trip records
 * - Insert seed data from JSON file
 * - Close database connection upon completion
 *
 * This script is intended to be run manually via:
 *   node app_api/models/seed.js
 */

// Initialize database connection
const Mongoose = require('./db');

// Import Trip model
const Trip = require('./travlr');

// Load seed data from JSON file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/**
 * Clears existing trip data and inserts fresh seed records.
 */
const seedDB = async () => {
	
	// Remove all existing trip documents
	await Trip.deleteMany({});
	
	// Insert seed data
	await Trip.insertMany(trips);
};

/**
 * Execute seeding process, then close connection.
 */
seedDB().then(async () => {
	
	// Close MongoDB connection
	await Mongoose.connection.close();
	
	// Exit process
	process.exit(0);
});
