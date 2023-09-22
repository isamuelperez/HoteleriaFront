import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from './services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: any = null;

  submitted = false;

  constructor(
    private readonly builder: FormBuilder,
    private readonly _loginService: LoginService,
    private readonly _toastr: ToastrService,
    private readonly router: Router,
    private readonly _cookieService: CookieService
  ) {}

  ngOnInit() {
    this.loginForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.builder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }




  onSubmit() {
    this._loginService
      .Authentication(this.loginForm.value)
      .subscribe({
        error: (error) => {
          console.log(error)
          this._toastr.error(error.error.message, 'Error en la autenticación')
          throw error;
        },
        next: (res) => {
          if(res.status==200){
            this.user = res.data;
            console.log(this.user);
            this.loginForm.patchValue({
              userName: null,
              password: null
            })

            sessionStorage.setItem('user', JSON.stringify(res.data.token));
            this._cookieService.set('token',res.data.token );


            this.router.navigate(['/home'])
          }
      }});
  }
}
