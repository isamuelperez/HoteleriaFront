import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private readonly http: HttpClient) {}

  gethotels(): Observable<any> {
    return this.http.get(`${environment.host}/Hotel/getAll/`);
  }

  createthotel(request: any): Observable<any> {
    return this.http.post(`${environment.host}/Hotel/create/`, request);
  }

  updatethotel(request: any, id: number): Observable<any> {
    const user = {
      userName:'isaias123',
      password:'isaias123',
      type:1
    }
    //request.user = user
    request.id = id;
    console.log(request);
    return this.http.put(`${environment.host}/Hotel/update/`, request);
  }
}
