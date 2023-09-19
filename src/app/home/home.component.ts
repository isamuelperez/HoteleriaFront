import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private readonly _loginService: LoginService){

  }

  ngOnInit(): void {
    this._loginService.gethotels().subscribe((res)=>{
      console.log(res);
    })
  }

}
