import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginService } from './login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class userGuard implements CanActivate {
  constructor(
    private readonly _cookieService: CookieService,
    private readonly router: Router,
    private readonly _loginService : LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const cookie = this._cookieService.check('token');

    if (!this._loginService.getAutentication()) {
      this.router.navigate(['', 'login']);
      return false;
    } else {
      return true;
    }
  }
}
