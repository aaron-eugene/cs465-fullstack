import { ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

/**
 * Application Configuration
 *
 * Defines global providers for the Angular standalone application.
 *
 * This replaces the traditional AppModule configuration.
 *
 * Providers configured here:
 * - Router configuration
 * - HTTP client for API communication
 */

export const appConfig: ApplicationConfig = {
  
  providers: [
    
	/**
     * Enables Angular routing and registers
     * application routes defined in app.routes.ts
     */
	provideRouter(routes),
	
	/**
     * Enables HttpClient throughout the application
     * for REST API communication
     */
	provideHttpClient()
  ]
};
