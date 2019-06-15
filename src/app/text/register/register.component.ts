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

  public reset_new_user() :void {
    this.constructNewUserObj();
  }

  create_new_user(): void {
    console.log('this.newUser', this.newUser);
  }

}
