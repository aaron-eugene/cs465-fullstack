import { Routes } from '@angular/router';

import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';

/**
 * Application Routes
 *
 * Defines navigation paths for the Angular SPA.
 *
 * Each route maps a URL path to a standalone component.
 * 
 */

export const routes: Routes = [

  /**
   * Default route (home/dashboard)
   * Displays the list of trips
   */
  { path: '', component: TripListing, pathMatch: 'full' },

  /**
   * Route for adding a new trip
   */
  { path: 'add-trip', component: AddTrip },

  /**
   * Route for editing an existing trip
   */
  { path: 'edit-trip', component: EditTrip },

  /**
   * Route for login page
   */
  { path: 'login', component: Login }

];
