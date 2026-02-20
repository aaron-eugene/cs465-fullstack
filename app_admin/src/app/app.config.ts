import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';

import { authInterceptProvider } from './utils/jwt-interceptor';

/**
 * Application Configuration
 *
 * Defines global providers for the Angular standalone application.
 * 
 * Providers configured here:
 * - Router configuration
 * - HTTP client for API communication
 * - JWT interceptor for Authorization header injection
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
     * for REST API communication.
     *
     * withInterceptorsFromDi() allows interceptors
     * registered via dependency injection to be used.
     */
    provideHttpClient(withInterceptorsFromDi()),

    /**
     * Registers JWT interceptor provider
     * to attach Authorization header automatically.
     */
    authInterceptProvider
  ]
};
