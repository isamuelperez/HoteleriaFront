import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login/services/login.service';
import { MenuItem } from 'primeng/api/menuitem';
import { Menu } from 'primeng/menu';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { HotelService } from '../hotel/services/hotel.service';
import { RoomService } from '../room/services/room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hoteles: Array<any> = [];
  title_modal: string = '';
  display: boolean = false;
  rooms: Array<any> = [];
  roomsAll: Array<any> = [];
  cities: Array<any> = [];
  items: MenuItem[] = [];
  @ViewChild('menu') menu!: Menu;
  assing : boolean = false;

  hotel : any = null;

  constructor(
    private readonly _hotelService: HotelService,
    private readonly _sharedService: SharedService,
    private readonly router: Router,
    private readonly _roomService: RoomService,
    private readonly _toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this._hotelService.gethotels().subscribe((res) => {
      this.hoteles = res.data;
      console.log(this.hoteles)
    });

    this._roomService.getRooms().subscribe((res) => {
      this.roomsAll = res.data;
      console.log(this.roomsAll);
    });

    this._sharedService.getLocations().subscribe((res) => {
      this.cities = res.data;
      this.test();
    });
  }

  nombresUnicos: any = [];

  result: any = [];

  test() {
    this.nombresUnicos = this.cities.map((x) => x.city);
    this.result = this.nombresUnicos.filter((item: any, index: any) => {
      return this.nombresUnicos.indexOf(item) === index;
    });

    const ciudadesObjetos = this.result.map((city: any) => {
      return { name: city };
    });

    this.cities = ciudadesObjetos;
    console.log(this.cities);
  }

  viewHotel(hotel: any) {
    this.hotel= hotel;
    this.display = false;
    this.title_modal =
      hotel.name + ' * ' + hotel.location.city + ' * ' + hotel.location.address;
    this.rooms = hotel.rooms;
    this.display = true;
  }

  close() {
    this.display = false;
  }

  selectCiy(city: any) {
    this._hotelService.gethotels().subscribe((res) => {
      this.hoteles = res.data;
      if (city.value != null) {
        let dataCopy = this.hoteles.filter(
          (x) => x.location.city == city.value.name
        );
        this.hoteles = dataCopy;
      } else {
        this.hoteles = res.data;
      }
    });
  }

  openMenu(room: any, event: any): void {
    console.log(room);
    this.items = [
      {
        label: 'Reservar',
        icon: undefined,
        id: room.id,
        command: (event) => {
          let { item } = event;
          this.router.navigate(['/home/booking']);
        },
      },
    ];
    this.menu.toggle(event);
  }

  openAssing(room: any, event: any): void {
    console.log(room);
    if(!room.enabled){
      this._toastr.error("Habitacion no disponible", 'Error');
      return ;
    }
    this.items = [
      {
        label: 'Asignar Habitación',
        icon: undefined,
        id: room.id,
        command: (event) => {
          let { item } = event;
        },
      },
    ];
    this.menu.toggle(event);
  }

  addHotel() {
    this.router.navigate(['/home/hotel']);
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

  assingRoom(){
    this.display = false;
    this.assing = false;
    this.assing = true;
  }
}
