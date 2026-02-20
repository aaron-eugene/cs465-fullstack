import { Inject, Injectable } from '@angular/core';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data';

/**
 * Authentication Service
 * 
 * Responsible for:
 * - Managing JWT storage
 * - Handling login and registration
 * - Determining authentication state
 * - Providing current user information
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  /**
   * Stores latest authentication response
   */
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

   /**
   * Retrieve JWT from local storage
   */
  public getToken(): string {
    const token = this.storage.getItem('travlr-token');
    return token ? token : '';
  }

  /**
   * Save JWT to local storage
   */
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  /**
   * Remove JWT from storage (logout)
   */
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }
  
  /**
   * Determine whether user is logged in
   * and token is not expired
   */
  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > (Date.now() / 1000);
  }
  
  /**
   * Retrieve current user information
   * from decoded JWT
   */
  public getCurrentUser(): User {
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }
  
  /**
   * Process login request
   */
  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd)
      .subscribe({
        next: (value: AuthResponse) => {
          if (value) {
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.error('Login Error:', error);
        }
      });
  }

  /**
   * Process registration request
   */
  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: AuthResponse) => {
          if (value) {
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.error('Register Error:', error);
        }
      });
  }
}
