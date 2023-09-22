import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private readonly http:  HttpClient) {}

  getReservations(): Observable<any> {
    return this.http.get(`${environment.host}/Reservation/getAll/`);
  }
}
