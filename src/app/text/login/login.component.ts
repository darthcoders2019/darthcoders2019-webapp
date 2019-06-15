import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {Router} from "@angular/router";

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
    private router: Router
  ) {
    this.user = {};
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.lng = (+pos.coords.longitude).toString();
      this.lat = (+pos.coords.latitude).toString();
    });
  }

  public login(): void {
    console.log('asd', this.user);

    if (!this.user.email) {
      console.error("Please insert your email.");
      return;
    }

    if (!this.user.password) {
      console.error("Please insert your password.");
      return;
    }

    this.authService.login(this.user).subscribe(
      (res: any) => { 
        
        sessionStorage.setItem('id', res.id);
        sessionStorage.setItem('token', res.token);

        this.router.navigate(['dashboard/feed']);
      },
      (err) => { 
        if (err.error && err.error.error) {
          console.error('invalid credentials');
        } else {
          console.error('server error');
        }
      }
    );
  }


}
