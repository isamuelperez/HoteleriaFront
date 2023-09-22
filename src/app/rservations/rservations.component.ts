import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ReservationService } from './services/reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rservations',
  templateUrl: './rservations.component.html',
  styleUrls: ['./rservations.component.css'],
})
export class RservationsComponent implements OnInit {
  items: MenuItem[] = [];
  @ViewChild('menu') menu!: Menu;

  title_modal: string = '';
  sesionActive: boolean = false;

  reservations: Array<any> = [];
  constructor(
    private readonly _reservationService: ReservationService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const userJSON = sessionStorage.getItem('user');
    if (userJSON !== null) {
      const user = JSON.parse(userJSON);
      this.sesionActive = true;
    } else {
      this._toastr.error('Inicie Sesion', 'inicar sesion');
      console.log('no inicio sesion');
      this.sesionActive = false;
    }
    this._reservationService.getReservations().subscribe((res) => {
      this.reservations = res.data;
      console.log(this.reservations);
    });
  }

  openMenu(reservacion: any, event: any): void {
    this.items = [
      {
        label: 'Ver Detalle',
        icon: undefined,
        id: reservacion.id,
        command: (event) => {
          let { item } = event;
          this.title_modal = 'Detalle de la reservación';
          this.viewDetatil(reservacion);
        },
      },
    ];
    this.menu.toggle(event);
  }

  typeRoom(id: number): string {
    switch (id) {
      case 0:
        return 'Individual';
      case 1:
        return 'Doble';
      case 2:
        return 'Matrimonial';
      case 3:
        return 'Familiar';
      default:
        return 'No existe';
    }
  }

  viewDetatil(reservacion: any) {
    console.log(reservacion);
  }
}
