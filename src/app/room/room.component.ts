import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { RoomService } from './services/room.service';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../hotel/services/hotel.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  roomForm!: FormGroup;
  typesRooms: Array<any> = [
    {
      name: 'Individual',
      id: 0,
    },
    {
      name: 'Doble',
      id: 1,
    },
    {
      name: 'Matrimonial',
      id: 2,
    },
    {
      name: 'Familiar',
      id: 3,
    },
  ];

  id_room: any = null;

  display: boolean = false;
  title_modal: string = '';

  assignRoom: boolean = false;
  hoteles: Array<any> = [];
  rooms: Array<any> = [];
  title_room: string = '';

  hotel: any = null;

  roomSelect: any = null;

  addNew: boolean = false;

  sesionActive: boolean = false;

  items: MenuItem[] = [];
  @ViewChild('menu') menu!: Menu;

  constructor(
    private readonly builder: FormBuilder,
    private readonly router: Router,
    private readonly _roomService: RoomService,
    private readonly _toastr: ToastrService,
    private readonly _htelService: HotelService
  ) {}

  ngOnInit() {
    const userJSON = sessionStorage.getItem('user');
    if (userJSON !== null) {
      const user = JSON.parse(userJSON);
      this.sesionActive = true;
    } else {
      console.log('no inicio sesion');
      this.sesionActive = false;
    }
    this.roomForm = this.buildForm();
    this._htelService.gethotels().subscribe((res) => {
      this.hoteles = res.data;
    });

    this._roomService.getRooms().subscribe((res) => {
      this.rooms = res.data;
    });
  }

  private buildForm(): FormGroup {
    return this.builder.group({
      name: ['', [Validators.required]],
      baseCost: ['', [Validators.required]],
      duty: ['', [Validators.required]],
      type: ['', [Validators.required]],
      location: ['', [Validators.required]],
      enabled: [false, [Validators.required]],
      maxCount: ['', [Validators.required]],
      hotelId: [null, [Validators.required]]
    });
  }

  HotelSelect(hotel: any) {
    console.log(hotel);
    this.hotel = hotel;
  }

  onSubmit() {
    if (this.id_room == null) {
      this._roomService.createRoom(this.roomForm.value).subscribe({
        error: (error) => {
          this._toastr.error(error.error.message, 'Error');
          throw error;
        },
        next: (res) => {
          if (res.status == 200) {
            this._toastr.success(res.message, 'Se Creo la Habitación');
            this.roomForm.reset();
            this._roomService.getRooms().subscribe((res) => {
              this.rooms = res.data;
            });
          }
        },
      });
    } else {
      this._roomService
          .updateRoom(this.roomForm.value, this.id_room)
          .subscribe({
            error: (error) => {
              this._toastr.error(error.error.message, 'Error');
              throw error;
            },
            next: (res) => {
              if (res.status == 200) {
                this._toastr.success(res.message, 'Se modifico la Habitacion');
                this._roomService.getRooms().subscribe((res) => {
                  this.rooms = res.data;
                });
                this.display = false;
              }
            },
          });
    }
  }

  openMenu(room: any, event: any): void {
    console.log(room);
    this.items = [
      {
        label: 'Modificar Habitación',
        icon: undefined,
        id: room.id,
        command: (event) => {
          let { item } = event;
          this.title_modal = 'Modificar Habitación';
          this.edit(room);
        },
      },
    ];
    this.menu.toggle(event);
  }

  assign(room: any) {
    this.roomForm.patchValue({
      selectHotel: '',
    });
    this.roomSelect = room;
    this.title_room = room.name;
    this.assignRoom = false;
    this.assignRoom = true;
  }

  closeAssign() {
    this.assignRoom = false;
  }

  onSubmitAssignHotel() {}

  add() {
    this.addNew = true;
    this.id_room = null;
    this.display = false;
    this.title_modal = 'Agregar Habitación';
    this.roomForm.reset();
    this.display = true;
  }

  edit(room: any) {
    this.addNew = false;
    this.id_room = room.id;
    this.display = false;
    this.roomForm.reset();
    this.display = true;
    this.roomForm.patchValue(room);
    this.roomForm.patchValue({
      hotelId: room.hotel.id
    })
    console.log(room.hotel.name)
  }

  close() {
    this.display = false;
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
}
