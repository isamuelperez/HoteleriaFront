import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from './services/booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  genders: Array<any> = [
    {
      name: 'Masculino',
      id: 0,
    },
    {
      name: 'Femenino',
      id: 1,
    },
  ];

  documentTypes: Array<any> = [
    {
      name: 'Cedula de Ciudadania',
      id: 0,
    },
    {
      name: 'Tarjeta de Indentidad',
      id: 1,
    },
    {
      name: 'Pasaporte',
      id: 2,
    },
    {
      name: 'Cedula de Extranjera',
      id: 3,
    },
  ];

  submitted = false;

  constructor(
    private readonly builder: FormBuilder,
    private readonly router: Router,
    private readonly _bookingService: BookingService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit() {
    this.bookingForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.builder.group({
      //cliente
      name: ['', [Validators.required]],
      surName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numberDocument: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      //
      //contacto de emergencia
      fullName: ['', [Validators.required]],
      numberContact: ['', [Validators.required]],
      //
      //reserva
      initDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      personCount: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this._bookingService.room != null) {
      this._bookingService.createReservation(this.bookingForm.value).subscribe({
        error: (error) => {
          console.log(error.error.message);
          this._toastr.error(error.error.message, 'Error');
          throw error;
        },
        next: (res) => {
          if (res.status == 200) {
            this._toastr.success(res.message, 'Se Creo El Hotel');
            this.bookingForm.reset();
            this._bookingService.setHotel(null, null);
            this.router.navigate(['/home']);
          }
        },
      });
    } else {
      this._toastr.error('Seleccione una habitacion de un hotel', 'Error');
      this.router.navigate(['/home']);
    }
  }
}
