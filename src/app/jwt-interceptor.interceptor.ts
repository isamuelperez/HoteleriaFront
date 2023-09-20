import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private readonly cookieService: CookieService, private readonly router: Router) {}
  private authReq : any;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.cookieService.get('token');

    if(token){
      this.authReq = request.clone({headers: request.headers.set('authorization', 'Bearer'+ token)});
    }
    return next.handle(this.authReq);
  }
}
