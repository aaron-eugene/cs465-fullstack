import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TripCard } from '../trip-card/trip-card';
import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';

/**
 * TripListing Component
 * 
 * Responsible for retrieving and displaying all Trip records
 * from the backend API.
 * 
 * Renders a collection of TripCard components and provides
 * navigation to the Add Trip screen.
 */

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  providers: [TripDataService],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  
  // Collection of trips retrieved from the API
  trips: Trip[] = [];
  
  //Status message displayed above the trip listing
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    console.log('trip-listing constructor');
  }
	
  /**
   * Navigate to the Add Trip screen
   */
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  /**
   * Retrieve all trips from the backend API
   * and update the local trips array.
   */
  private getTrips(): void {
    this.tripDataService.getTrips()
    .subscribe({
      next: (value: Trip[]) => {
			
        // Assign returned trips to component state
        this.trips = value;

        // Update status message based on results
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database';
        }

        // DEBUG
        //console.log(this.message);

        // Force view update (Angular 17+ zoneless compatibility)
        this.cdr.detectChanges();
      },
        
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  /**
   * Lifecycle hook.
   * Called once after component initialization.
   */
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getTrips();
  }
}
