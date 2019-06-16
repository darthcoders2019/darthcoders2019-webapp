import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public newUser: any;
  constructor(
    private toastr: ToastrService,    
    private authService: AuthService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.constructNewUserObj();
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

    navigator.geolocation.getCurrentPosition(pos => {
      this.newUser.lng = (+pos.coords.longitude).toString();
      this.newUser.lat = (+pos.coords.latitude).toString();
    });
  }

  public reset_new_user(): void {
    this.constructNewUserObj();
  }

  create_new_user(): void {
    if (!this.newUser.fullname) {
      this.toastr.error("Please insert your fullname.");
      return;
    }
    if (!this.newUser.email) {
      this.toastr.error("Please insert your email address.");
      return;
    }
    if (!this.newUser.password) {
      this.toastr.error("Please insert your password.");
      return;
    }
    if (!this.newUser.confirmpassword) {
      this.toastr.error("Please confirm your password.");
      return;
    }

    if (this.newUser.password != this.newUser.confirmpassword) {
      this.toastr.error("Your password and confirmation password do not match.");
      return;
    }

    if (localStorage.length) {
      this.newUser.fcmToken = localStorage.getItem('fcmToken');
    }
    

    this.authService.register(this.newUser).subscribe(
      (res) => {
        this.toastr.success('Please login to validate your registration')
        this.router.navigate(['text/login']);
      },
      (err) => {
        this.toastr.error('A problem occured while creating your account.')
      }
    );


  }

}
