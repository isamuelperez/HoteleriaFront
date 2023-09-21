import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private readonly http:  HttpClient) {}

  createRoom(room: any): Observable<any> {
    return this.http.post(`${environment.host}/Room/create`, room);
  }


  updateRoom(room: any, id: number, hotel: any): Observable<any> {
    room.id = id;
    room.hotel=hotel;
    return this.http.post(`${environment.host}/Room/update`, room);
  }

  getRooms(): Observable<any> {
    return this.http.get(`${environment.host}/Room/getAll/`);
  }
}
