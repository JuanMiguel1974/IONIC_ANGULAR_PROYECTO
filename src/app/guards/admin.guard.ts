import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authSvc: AuthService,
    private router: Router,

  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.authSvc.admin$.pipe(
        take(1),
        map((user) => {
          if (user.uid === 'fgOaSpQTZOZeDNaE6YvPSJSu0g12' ) {
            return true;
          } else {
            this.router.navigate(['/home']);
            return false;
          }
        })
      );
  }
}
