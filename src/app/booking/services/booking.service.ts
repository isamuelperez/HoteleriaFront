import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private readonly http: HttpClient) {}

  room: any = null;
  hotel : any = null;

  getReservations(): Observable<any> {
    return this.http.get(`${environment.host}/Reservation/getAll/`);
  }

  setHotel(room:any, hotel: any){
    this.room = room;
    this.hotel = hotel
  }

  createReservation(request: any): Observable<any> {

    const client ={
      name: request.name,
      surName: request.surName,
      gender: request.gender,
      email: request.email,
      numberDocument: request.numberDocument,
      documentType: request.documentType,
      phone: request.phone,
      birthDate: request.birthDate,
    }

    const emergencyContact = {
      fullName: request.fullName,
      numberContact: request.numberContact,
    }

    const updateRoomRequest = {
      id: this.room.id,
      hotelId: this.hotel.hotelId,
      name: this.room.name,
      baseCost: this.room.baseCost,
      duty: this.room.duty,
      type: this.room.type,
      location: this.room.location,
      enabled: false,
      maxCount: this.room.maxCount
    }

    const req = {
      roomId: this.room.id,
      client: client,
      emergencyContact: emergencyContact,
      initDate: request.initDate,
      endDate: request.endDate,
      personCount: request.personCount,
      updateRoomRequest: updateRoomRequest
    }

    console.log(req);
    return this.http.post(`${environment.host}/Reservation/create/`, req);
  }
}
