import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TripDataService } from '../services/trip-data';

/**
 * AddTrip Component
 *
 * Provides a form for creating a new Trip record.
 * 
 * Uses Angular Reactive Forms to validate input and
 * submits data to the Express backend via TripDataService.
 */

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrls: ['./add-trip.css']
})
export class AddTrip implements OnInit {

  /**
   * Reactive form group used to capture trip data
   */
  public addForm!: FormGroup;
	
  // Whether the form has been submitted
  // Used for validation display logic
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  /**
   * Lifecycle hook.
   * Initializes the reactive form structure.
   */
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  
  /**
   * Handles form submission.
   * 
   * Validates input and sends POST request
   * to backend API if form is valid.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
						
            // Returns to trip listing after successful save
            this.router.navigate(['']);
          },
		  
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  /**
   * Convenience getter for form controls.
   * Allows cleaner access in the template (f['code'], etc.).
   */
  get f() {
    return this.addForm.controls;
  }
}
