/**
 * AuthResponse Model
 * 
 * Represents the response returned
 * from the Express authentication endpoints.
 * 
 */
 
export class AuthResponse {

  // JSON Web Token returned by the API
  token: string;

  constructor() {
    this.token = '';
  }
}