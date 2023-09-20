import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private readonly http:  HttpClient) {}

  getLocations(): Observable<any> {
    return this.http.get(`${environment.host}/Location/getAll/`);
  }
}
