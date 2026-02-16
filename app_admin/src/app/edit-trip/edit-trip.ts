import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';

/**
 * EditTrip Component
 *
 * Provides a form for editing an existing Trip record.
 * Loads the selected trip using the tripCode stored in
 * localStorage and submits updates via PUT request.
 */

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {

  /**
   * Reactive form group used to edit trip data
   */
  public editForm!: FormGroup;

  /**
   * Holds the retrieved trip record
   */
  trip!: Trip;

  // Whether the form has been submitted
  submitted = false;

  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  /**
   * Lifecycle hook.
   * Retrieves the tripCode from localStorage,
   * loads the trip from the API,
   * and patches the form with existing values.
   */
  ngOnInit(): void {

    // Retrieve stored tripCode
    const tripCode = localStorage.getItem('tripCode');

    if (!tripCode) {
      alert("Something went wrong. tripCode not found.");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTrip::ngOnInit');
    console.log('tripCode: ' + tripCode);

    // Initialize reactive form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Retrieve trip from API
    this.tripService.getTrip(tripCode)
      .subscribe({
        next: (value: Trip[]) => {

          if (!value || value.length === 0) {
            this.message = 'No Trip Retrieved!';
            console.log(this.message);
            return;
          }

          // Store first (and only) record
          this.trip = value[0];

          // Populate form with trip data
          this.editForm.patchValue(this.trip);

          this.message = 'Trip: ' + tripCode + ' retrieved';
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  /**
   * Handles form submission.
   * Sends PUT request to backend API.
   */
  public onSubmit(): void {

    this.submitted = true;

    if (this.editForm.valid) {

      this.tripService.updateTrip(this.editForm.value)
        .subscribe({
          next: (value: Trip) => {
            console.log(value);

            // Navigate back to trip listing
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  /**
   * Convenience getter for template form control access.
   */
  get f() {
    return this.editForm.controls;
  }
}
