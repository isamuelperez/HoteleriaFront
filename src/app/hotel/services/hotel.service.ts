import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private readonly http:  HttpClient) {}

  gethotels(): Observable<any> {
    return this.http.get(`${environment.host}/Hotel/getAll/`);
  }

  createthotel(request: any): Observable<any> {
    console.log(request)
    return this.http.post(`${environment.host}/Hotel/create/`,request);
  }
}
