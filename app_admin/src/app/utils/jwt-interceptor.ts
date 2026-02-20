import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication';

/**
 * JWT Interceptor
 *
 * Intercepts outgoing HTTP requests and attaches
 * Authorization header when user is logged in.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let isAuthAPI: boolean;

    // Determine if request is for login/register
    if (
      request.url.includes('login') ||
      request.url.includes('register')
    ) {
      isAuthAPI = true;
    } else {
      isAuthAPI = false;
    }

    // If logged in and not calling auth endpoint, attach token
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {

      const token = this.authenticationService.getToken();

      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq);
    }

    return next.handle(request);
  }
}

/**
 * Provider used to register interceptor
 * in Angular HTTP pipeline
 */
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
