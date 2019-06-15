import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user:any;

  constructor() { 
    this.user = {};
  }

  ngOnInit() {
  }

  public login():void {
    console.log('asd', this.user);
  }


}
