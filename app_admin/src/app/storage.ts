import { InjectionToken } from '@angular/core';

/**
 * Browser Storage Injection Token
 * 
 * Provides access to the browser's localStorage API
 * through Angular's dependency injection system.
 * 
 * This allows services and components to inject
 * browser storage without directly referencing
 * the global localStorage object.
 * 
 */
export const BROWSER_STORAGE = new InjectionToken<Storage>(
  'Browser Storage',
  {
    providedIn: 'root',
    factory: () => localStorage
  }
);

/**
 * Storage Utility Class
 * 
 * Placeholder class used as a typing reference
 * for Angular dependency injection.
 * 
 * The actual implementation is provided by
 * the BROWSER_STORAGE injection token factory.
 */
export class Storage {
}