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
    console.log(room)
    return this.http.post(`${environment.host}/Room/create`, room);
  }


  updateRoom(room: any, id: number): Observable<any> {
    room.id = id;
    console.log(room)
    return this.http.put(`${environment.host}/Room/update`, room);
  }

  getRooms(): Observable<any> {
    return this.http.get(`${environment.host}/Room/getAll/`);
  }
}
