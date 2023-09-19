import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  user: any = null;

  genders: Array<any> = [
    {
      name: 'Masculino',
      id: 1,
    },
    {
      name: 'Femenino',
      id: 2,
    },
  ];

  documentTypes: Array<any> = [
    {
      name: 'Cedula de Ciudadania',
      id: 1,
    },
    {
      name: 'Tarjeta de Indentidad',
      id: 2,
    },
    {
      name: 'Pasaporte',
      id: 3,
    },
    {
      name: 'Cedula de Extranjera',
      id: 4,
    },
  ]

  submitted = false;

  constructor(
    private readonly builder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.bookingForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.builder.group({
      name: ['', [Validators.required]],
      surName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numberDocument: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      nameEmergncy: ['', [Validators.required]],
      phoneEmergncy: ['', [Validators.required]],
    });
  }

  onSubmit() {
    //this.router.navigate(['/booking']);
  }
}
