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

@Injectable({
  providedIn: 'root',
})
export class userGuard implements CanActivate {
  constructor(
    private readonly _cookieService: CookieService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const cookie = this._cookieService.check('token');

    if (!cookie) {
      this.router.navigate(['', 'login']);
      return false;
    } else {
      console.log("guard")
      return true;
    }
  }
}
