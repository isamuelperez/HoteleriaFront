import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { userGuard } from './user-guard.guard';
import { RoomComponent } from './room/room.component';
import { HotelComponent } from './hotel/hotel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    //canActivate: [userGuard],
    component: HomeComponent,
  },
  {
    path: 'home/booking',
    component: BookingComponent,
  },
  {
    path: 'home/room',
    component: RoomComponent,
  },
  {
    path: 'home/hotel',
    component: HotelComponent,
  },

  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
