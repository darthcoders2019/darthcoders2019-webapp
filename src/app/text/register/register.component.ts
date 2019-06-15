import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public newUser: any;
  constructor(
    private authService: AuthService
  ) {
    
  }

  ngOnInit() {
    this.constructNewUserObj();

    navigator.geolocation.getCurrentPosition(pos => {
      this.newUser.lng = (+pos.coords.longitude).toString();
      this.newUser.lat = (+pos.coords.latitude).toString();
    });
  }

  private constructNewUserObj(): void {
    this.newUser = {
      fullname: null,
      email: null,
      password: null,
      confirmpassword: null,
      lat: null,
      lng: null
    }
  }

  public reset_new_user(): void {
    this.constructNewUserObj();
  }

  create_new_user(): void {
    if (!this.newUser.fullname) {
      console.error("Please insert your fullname.");
      return;
    }
    if (!this.newUser.email) {
      console.error("Please insert your email address.");
      return;
    }
    if (!this.newUser.password) {
      console.error("Please insert your password.");
      return;
    }
    if (!this.newUser.confirmpassword) {
      console.error("Please confirm your password.");
      return;
    }
    console.log(this.newUser);
    if (this.newUser.password != this.newUser.confirmpassword) {
      console.error("Your password and confirmation password do not match.");
      return;
    }

    

    this.authService.register(this.newUser).subscribe(
      (res) => {
        console.log('OKAY', res)
      },
      (err) => {
        console.error('FAILED', err)
      }
    );


  }

}
