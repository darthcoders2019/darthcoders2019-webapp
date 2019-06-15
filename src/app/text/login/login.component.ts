import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

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
    private authService: AuthService
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
      (res) => { 
        console.log(res);
      },
      (err) => { 
        console.log(err);
      }
    );
  }


}
