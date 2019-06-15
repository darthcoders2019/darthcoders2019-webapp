import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public newUser: any;
  constructor() { 
    this.constructNewUserObj();
  }

  ngOnInit() {
  }

  private constructNewUserObj() : void {
    this.newUser = {
      fullname: null,
      username: null,
      email: null,
      password: null,
      confirmpassword: null
    }
  }

}
