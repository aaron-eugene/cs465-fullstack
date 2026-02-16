/**
 * Trip Interface
 *
 * Defines the shape of a Trip object as it exists
 * in both the Angular SPA and the Express backend API.
 *
 * This interface ensures strong typing when:
 * - Retrieving trips from the API
 * - Creating new trips
 * - Updating existing trips
 */
export interface Trip {

  // MongoDB document primary key
  _id: string;

  // Unique trip identifier used in routing and updates
  code: string;

  // Display name of the trip
  name: string;

  // Duration of the trip (e.g., "4 days / 3 nights")
  length: string;

  // Trip start date
  start: Date;

  // Resort or destination location
  resort: string;

  // Price per person
  perPerson: string;

  // Image filename used in the SPA
  image: string;

  // HTML-formatted description of the trip
  description: string;
}
