import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HoteleriaFront';

  constructor(private readonly router: Router,){

  }

  ngOnInit(): void {

  }

  login(){

    sessionStorage.clear();

    this.router.navigate(['/login'])
  }
}
