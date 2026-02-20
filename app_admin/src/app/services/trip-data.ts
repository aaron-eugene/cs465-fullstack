import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

/**
 * TripDataService
 * 
 * Handles all HTTP communication between the Angular SPA
 * and the Express backend API.
 * 
 * Responsibilities:
 * - Trip CRUD operations
 * - Authentication API calls (login/register)
 */

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  // Base API endpoint
  baseUrl = 'http://localhost:3000/api';

  // Trips endpoint
  url = this.baseUrl + '/trips';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  /**
   * GET: Retrieve all trips
   */
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }
  
  /**
   * POST: Add a new trip
   */
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  /**
   * GET: Retrieve a single trip (as an array) by trip code
   */
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  /**
   * PUT: Update an existing trip
   */
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  /**
   * Call to /login endpoint, returns JWT
   */
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  /**
   * Call to /register endpoint, creates user and returns JWT
   */
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  /**
   * Helper method to process login and register requests
   */
  private handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string
  ): Observable<AuthResponse> {

    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(
      this.baseUrl + '/' + endpoint,
      formData
    );
  }
}
