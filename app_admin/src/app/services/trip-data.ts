import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

/**
 * TripDataService
 * 
 * Handles all HTTP communication between the Angular SPA
 * and the Express backend API for Trip records.
 */

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) {}
	
  // Base API endpoint for trips
  url = 'http://localhost:3000/api/trips';

  /**
   * GET: Retrieve all trips
   */
  getTrips(): Observable<Trip[]> {
    //console.log('In TripData::getTrips()');
    return this.http.get<Trip[]>(this.url);
  }
  
  /**
   * POST: Add a new trip
   */
  addTrip(formData: Trip) : Observable<Trip> {
    //console.log('In TripData::addTrip()');
    return this.http.post<Trip>(this.url, formData);
  }

  /**
   * GET: Retrieve a single trip (as an array) by trip code
   */
  getTrip(tripCode: string) : Observable<Trip[]> {
    //console.log('In TripData::getTrip()');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  /**
   * PUT: Update an existing trip
   */
  updateTrip(formData: Trip) : Observable<Trip> {
    //console.log('In TripData::updateTrip()');
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }
}
