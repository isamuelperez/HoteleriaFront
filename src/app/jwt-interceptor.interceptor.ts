import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login/services/login.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private readonly _loginService: LoginService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if(request.url.endsWith('/User/Authentication')){
      return next.handle(request);
    }
    const token: string = this._loginService.getUser().token;

    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    request = request.clone({ headers });
    return next.handle(request);
  }
}
