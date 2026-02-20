import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar/navbar';

/**
 * Root Application Component
 *
 * This is the entry point for the Angular SPA.
 * 
 * It provides:
 * - The application layout shell
 * - The navigation header
 * - The router outlet used to dynamically render components
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('Travlr Getaways Admin!');
}
