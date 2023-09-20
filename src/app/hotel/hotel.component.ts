import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from './services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
})
export class HotelComponent implements OnInit {
  formHotel!: FormGroup;
  items: MenuItem[] = [];
  @ViewChild('menu') menu!: Menu;
  title_modal: string = '';
  hoteles: Array<any> = [];
  display: boolean = false;
  id_hotel: any = null;

  constructor(
    private readonly builder: FormBuilder,
    private readonly _hotelService: HotelService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formHotel = this.buildForm();
    this._hotelService.gethotels().subscribe((res) => {
      this.hoteles = res.data;
    });
  }

  private buildForm(): FormGroup {
    return this.builder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      enabled: [false, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.id_hotel == null) {
      this._hotelService.createthotel(this.formHotel.value).subscribe({
        error: (error) => {
          this._toastr.error(error.error.message, 'Error');
          throw error;
        },
        next: (res) => {
          if (res.status == 200) {
            this._toastr.success(res.message, 'Se Creo El Hotel');
            this.formHotel.reset();
          }
        },
      });
    } else {
      console.log('Modificar');
    }
  }

  openMenu(room: any, event: any): void {
    console.log(room);
    this.items = [
      {
        label: 'Modificar Hotel',
        icon: undefined,
        id: room.id,
        command: (event) => {
          let { item } = event;
          this.edit(room);
        },
      },
    ];
    this.menu.toggle(event);
  }

  add() {
    this.id_hotel = null;
    this.display = false;
    this.formHotel.reset();
    this.display = true;

    this.title_modal = 'Agregar Hotel';
  }

  edit(hotel: any) {
    this.id_hotel = hotel.id;
    this.formHotel.reset();
    this.formHotel.patchValue({
      name: hotel.name,
      image: hotel.image,
      city: hotel.location.city,
      address: hotel.location.address,
      enabled: hotel.enabled,
    });
    this.display = false;
    this.display = true;
    this.title_modal = 'Modificar Hotel';
  }

  cancel() {
    this.display = false;
  }
}
