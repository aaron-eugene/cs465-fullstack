/**
 * User Model
 * 
 * Represents authenticated user data
 * within the Angular application.
 * 
 * Only client-relevant attributes are stored:
 * 
 */
 
export class User {

  email: string;

  name: string;

  constructor() {
    this.email = '';
    this.name = '';
  }
}
