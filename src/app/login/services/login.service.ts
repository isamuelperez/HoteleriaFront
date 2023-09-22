import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http:  HttpClient) {}

  gethotels(): Observable<any> {
    return this.http.get(`${environment.host}/Hotel/getAll/`);
  }

  Authentication(user: User): Observable<any> {
    return this.http.post(`${environment.host}/User/Authentication`,user);
  }

  //getTeam(id: number): Observable<any> {
  //  return this.http.get(`${this.apiUrl}/consultar/${id}`);
  //}
//
//
  //createTeam(equipoData: any): Observable<any> {
  //  return this.http.post(`${this.apiUrl}/crear`, equipoData);
  //}
//
  //updateTeam(id: number, equipoData: any): Observable<any> {
  //  return this.http.put(`${this.apiUrl}/actualizar/${id}`, equipoData);
  //}
//
  //deleteTeam(id: number): Observable<any> {
  //  return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  //}

}
