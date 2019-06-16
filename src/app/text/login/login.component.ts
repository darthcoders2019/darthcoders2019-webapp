import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Speech from 'speak-tts';
import { SpeechService } from 'ngx-speech';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;
  private lng: string;
  private lat: string;
  speech;

  constructor(
    private authService: AuthService,
    private router: Router,
    public speechService: SpeechService,
    private toastr: ToastrService
  ) {
    this.speech = new Speech();
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log('speech synthesis supported');
    }

    this.user = {};
  }

  ngOnInit() {
    console.log(localStorage.getItem('key_selected'));

    this.speech.init({
      volume: 1,
      lang: 'en-GB',
      rate: 1,
      pitch: 1,
      voice: 'Google UK English Female',
      splitSentences: true,
      listeners: {
        onvoiceschanged: voices => {
          //console.log('Event voiceschanged', voices);
        }
      }
    });

    navigator.geolocation.getCurrentPosition(pos => {
      this.lng = (+pos.coords.longitude).toString();
      this.lat = (+pos.coords.latitude).toString();
    });

    if (sessionStorage.length && sessionStorage.getItem('token')) {
      this.router.navigate(['dashboard/feed']);
    }
  }

  createAccount() {
    this.speech
      .speak({
        text: 'successful',
        queue: false
      })
      .then(() => {})
      .catch(e => {
        console.error('An error occurred :', e);
      });
    this.router.navigate(['/text/register']);
  }

  speak(text, startSpeechAction) {
    if (startSpeechAction) {
      this.speechService.start();
    }
    if (localStorage.getItem('key_selected') == 'speech') {
      this.speech
        .speak({
          text: text,
          queue: false
        })
        .then(() => {
          console.log('Success !');
        })
        .catch(e => {
          console.error('An error occurred :', e);
        });
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
        this.speech
          .speak({
            text: 'successful',
            queue: false
          })
          .then(() => {})
          .catch(e => {
            console.error('An error occurred :', e);
          });
        sessionStorage.setItem('id', res.id);
        sessionStorage.setItem('token', res.token);

        this.router.navigate(['dashboard/feed']);
        location.reload();
      },
      err => {
        if (err.error && err.error.error) {
          this.toastr.error('Invalid combination of credentials.');
        } else {
          this.toastr.error('Server error. Please try later');
        }
      }
    );
  }
}
