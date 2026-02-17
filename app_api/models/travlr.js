/**
 * travlr.js
 * =========
 *
 * Defines the Mongoose schema and model for Trip documents.
 *
 * Responsibilities:
 * - Define structure of trip records
 * - Enforce required fields
 * - Register Trip model with Mongoose
 *
 * This model is used by API controllers to perform CRUD operations.
 */

const mongoose = require('mongoose');

/**
 * Trip Schema
 *
 * Represents a travel package offered in the Travlr application.
 *
 * Fields:
 * - code: Unique trip identifier (indexed for query performance)
 * - name: Display name of the trip (indexed for search support)
 * - length: Duration of trip (e.g., "6 days / 7 nights")
 * - start: Start date of the trip
 * - resort: Resort or destination location
 * - perPerson: Price per person
 * - image: Image filename or URL
 * - description: Detailed description of the trip
 */
const tripSchema = new mongoose.Schema({
	code: {type: String, required: true, index: true },
	name: {type: String, required: true, index: true },
	length: {type: String, required: true },
	start: {type: Date, required: true },
	resort: {type: String, required: true },
	perPerson: {type: String, required: true },
	image: {type: String, required: true },
	description: {type: String, required: true }
});

/**
 * Register Trip model.
 *
 * Collection name: "trips"
 * Documents in this collection must conform to tripSchema.
 */
const Trip = mongoose.model('trips', tripSchema);

// Export Trip model for use in controllers and seed scripts.
module.exports = Trip;
