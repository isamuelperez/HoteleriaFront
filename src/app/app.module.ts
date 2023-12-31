import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BookingComponent } from './booking/booking.component';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import {CookieService} from 'ngx-cookie-service';
import { RoomComponent } from './room/room.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HotelComponent } from './hotel/hotel.component';
import { RservationsComponent } from './rservations/rservations.component';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BookingComponent,
    RoomComponent,
    HotelComponent,
    RservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    DialogModule,
    TableModule,
    PaginatorModule,
    TabViewModule,
    MenuModule,
    CalendarModule,
    InputSwitchModule,
    ToastrModule.forRoot(),
  ],
  providers: [CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
