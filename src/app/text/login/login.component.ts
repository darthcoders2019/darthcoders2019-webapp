import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any;
  private lng: string;
  private lat: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.user = {};
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.lng = (+pos.coords.longitude).toString();
      this.lat = (+pos.coords.latitude).toString();
    });

    if (sessionStorage.length && sessionStorage.getItem('token')) {
      this.router.navigate(['dashboard/feed']);
    }
  }

  public login(): void {

    if (!this.user.email) {
      this.toastr.error('Please insert your email.');
      return;
    }

    if (!this.user.password) {
      this.toastr.error('Please insert your password.');
      return;
    }

    this.authService.login(this.user).subscribe(
      (res: any) => { 
        
        sessionStorage.setItem('id', res.id);
        sessionStorage.setItem('token', res.token);

        this.router.navigate(['dashboard/feed']);
        location.reload();
      },
      (err) => { 
        if (err.error && err.error.error) {
          this.toastr.error('Invalid combination of credentials.');
        } else {
          this.toastr.error('Server error. Please try later');
        }
      }
    );
  }


}
