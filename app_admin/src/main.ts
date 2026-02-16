import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * Main Application Entry Point
 *
 * Bootstraps the Angular standalone application.
 *
 * Instead of using a traditional AppModule,
 * Angular standalone components are initialized
 * using bootstrapApplication().
 *
 * - App is the root component
 * - appConfig provides router and global configuration
 */
 
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
