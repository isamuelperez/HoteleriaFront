import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HoteleriaFront';

  constructor(
    private readonly router: Router,
    private readonly _cookieService: CookieService,
    private readonly _loginService: LoginService
  ) {}

  ngOnInit(): void {
    console.log(this.user);
  }

  login() {
    this._loginService.setAutentication(false);

    this.router.navigate(['/login']);
  }

  get isAutentication() {
    return this._loginService.getAutentication();
  }

  get user() {
    return this._loginService.getUser();
  }
}
