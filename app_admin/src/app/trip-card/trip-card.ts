import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

/**
 * TripCard Component
 * 
 * Responsible for rendering a single Trip record
 * as a Bootstrap card in the trip listing view.
 * 
 * Provides navigation to the Edit Trip screen.
 */

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard implements OnInit {
	
  /**
   * Trip object passed in from parent (TripListing component)
   */
  @Input('trip') trip: any;
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {}
  
  /**
   * Navigate to the Edit Trip screen
   * 
   * Stores the selected trip code in localStorage
   * so the EditTrip component can retrieve it.
   */
  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
		
    // Navigate to edit-trip route
    this.router.navigate(['edit-trip']);
  }
}
