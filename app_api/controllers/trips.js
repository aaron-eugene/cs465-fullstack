/**
 * trips.js
 * =========
 *
 * Controller functions for Trip API endpoints.
 *
 * This file handles:
 * - Listing all trips
 * - Finding trips by code
 * - Creating new trips
 * - Updating existing trips
 *
 * All endpoints return JSON responses with appropriate HTTP status codes.
 */

const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Ensure model is registered
const Model = mongoose.model('trips');

/**
 * GET /api/trips
 *
 * Retrieves all trip records from the database.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} Array of trip objects or 404 if none found
 */
const tripsList = async(req, res) => {
	
	const q = await Model
		.find({})
		.exec();
		
	// No records found
	if (!q) {
		return res
			.status(404)
			.json({ message: 'No trips found' });
	} 
	
	// Return resulting trip list
	return res
		.status(200)
		.json(q);
};

/**
 * GET /api/trips/:tripCode
 *
 * Retrieves trip(s) matching the provided trip code.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} Array of matching trip objects or 404 if none found
 */
const tripsFindByCode = async(req, res) => {
	
	const q = await Model
		.find({'code' : req.params.tripCode })
		.exec();
	
	// No matching records found
	if (!q) {
		return res
			.status(404)
			.json({ message: 'No matching trip found' });
	}
	
	// Return resulting trip list
	return res
		.status(200)
		.json(q);
};

/**
 * POST /api/trips
 *
 * Creates a new trip record using request body data.
 *
 * @param {Object} req - Express request object containing trip data
 * @param {Object} res - Express response object
 * @returns {JSON} Newly created trip object or 400 if creation fails
 */
const tripsAddTrip = async(req, res) => {
	
	const newTrip = new Trip({
		code: req.body.code,
		name: req.body.name,
		length: req.body.length,
		start: req.body.start,
		resort: req.body.resort,
		perPerson: req.body.perPerson,
		image: req.body.image,
		description: req.body.description
	});
	
	const q = await newTrip.save();
	
	// Creation failed
	if(!q)
	{ 
		return res
			.status(400)
			.json({ message: 'Unable to create trip' });
	} 
	
	// Return new trip
	return res
		.status(201)
		.json(q);
}

/**
 * PUT /api/trips/:tripCode
 *
 * Updates an existing trip record identified by tripCode.
 *
 * @param {Object} req - Express request object containing updated trip data
 * @param {Object} res - Express response object
 * @returns {JSON} Updated trip object or 404 if not found
 */
const tripsUpdateTrip = async(req, res) => {

	const q = await Model
		.findOneAndUpdate(
			{ 'code' : req.params.tripCode },
			{
				code: req.body.code,
				name: req.body.name,
				length: req.body.length,
				start: req.body.start,
				resort: req.body.resort,
				perPerson: req.body.perPerson,
				image: req.body.image,
				description: req.body.description
			}
		)
		.exec();
		
		// No matching document found to update		
		if(!q)
		{ 
			return res
				.status(400)
				.json({ message: 'Trip not found' });
		} 
		
		// Return resulting updated trip
		return res
			.status(201)
			.json(q);
};

//Export controller functions for use in API route definitions.
// These functions are mapped to routes in app_api/routes.
module.exports = {
	tripsList,
	tripsFindByCode,
	tripsAddTrip,
	tripsUpdateTrip
};
