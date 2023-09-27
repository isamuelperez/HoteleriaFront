import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAutentifaction: boolean = false;

  private user : any = null;

  constructor(private readonly http: HttpClient) {}

  setAutentication(autentication: boolean) {
    this.isAutentifaction = autentication;
  }

  getAutentication(): boolean {
    return this.isAutentifaction;
  }

  setUser(user: any){
    this.user = user;
  }

  getUser(): any{
    return this.user;
  }

  gethotels(): Observable<any> {
    return this.http.get(`${environment.host}/Hotel/getAll/`);
  }

  Authentication(user: User): Observable<any> {
    return this.http.post(`${environment.host}/User/Authentication`, user);
  }
}
