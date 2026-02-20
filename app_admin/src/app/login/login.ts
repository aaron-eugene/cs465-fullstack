import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication';
import { User } from '../models/user';

/**
 * Login Component
 *
 * Handles user login workflow and
 * delegates authentication to AuthenticationService.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  /**
   * Triggered when login form is submitted
   */
  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email ||
        !this.credentials.password ||
        !this.credentials.name) {

      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#');
    } else {
      this.doLogin();
    }
  }

  /**
   * Performs login process and redirects
   */
  private doLogin(): void {

    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    this.authenticationService.login(
      newUser,
      this.credentials.password
    );

    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
    } else {
      setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        }
      }, 3000);
    }
  }
}
