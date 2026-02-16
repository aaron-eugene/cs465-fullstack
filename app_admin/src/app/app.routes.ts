import { Routes } from '@angular/router';

import { AddTrip } from './add-trip/add-trip';
import { TripListing } from './trip-listing/trip-listing';
import { EditTrip } from './edit-trip/edit-trip';

/**
 * Application Routes
 *
 * Defines navigation paths for the Angular SPA.
 *
 * Each route maps a URL path to a standalone component.
 *
 * Routes:
 * - ''           → Trip listing dashboard
 * - 'add-trip'   → Add new trip form
 */

export const routes: Routes = [
  
  /**
   * Route for adding a new trip
   */
  { path: 'add-trip', component: AddTrip },
  
    /**
   * Route for editing an existing trip
   */
  { path: 'edit-trip', component: EditTrip },
  
  /**
   * Default route (home/dashboard)
   * Displays the list of trips
   */
  { path: '', component: TripListing, pathMatch: 'full' }
];
