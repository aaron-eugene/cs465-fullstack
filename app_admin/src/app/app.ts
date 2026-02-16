import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root Application Component
 *
 * This is the entry point for the Angular SPA.
 * 
 * It provides:
 * - The application layout shell
 * - The navigation header
 * - The router outlet used to dynamically render components
 *
 * All routed components (TripListing, AddTrip, EditTrip, etc.)
 * are rendered inside the <router-outlet>.
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  /**
   * Application title displayed in the navigation bar.
   * 
   * Angular signal is used here for reactive state handling.
   */
  protected readonly title = signal('Travlr Getaways Admin!');
}
