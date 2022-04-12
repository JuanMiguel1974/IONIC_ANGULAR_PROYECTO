/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    private authSvc: AuthService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authSvc.getToken();
    const authRequest = !authToken ? req : req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
  });
    return next.handle(authRequest);
  }
}
