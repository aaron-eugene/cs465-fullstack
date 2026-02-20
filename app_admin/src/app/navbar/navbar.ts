import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthenticationService } from '../services/authentication';

/**
 * Navbar Component
 * 
 * Provides application navigation and
 * login/logout toggle based on authentication state.
 */
 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  /**
   * Determine if user is currently logged in
   */
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  /**
   * Logout current user
   */
  public onLogout(): void {
    this.authenticationService.logout();
  }
}
