import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import Speech from 'speak-tts';
import { SpeechService } from 'ngx-speech';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public newUser: any;
  speech;

  constructor(
    private toastr: ToastrService,
    public speechService: SpeechService,
    private authService: AuthService,
    private router: Router,
    private _location: Location
  ) {
    this.speech = new Speech();
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log('speech synthesis supported');
    }
  }

  ngOnInit() {
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
    };

    navigator.geolocation.getCurrentPosition(pos => {
      this.newUser.lng = (+pos.coords.longitude).toString();
      this.newUser.lat = (+pos.coords.latitude).toString();
    });
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

  backToHomepage() {
    this._location.back();
  }

  public reset_new_user(): void {
    this.constructNewUserObj();
  }

  create_new_user(): void {
    if (!this.newUser.fullname) {
      this.toastr.error('Please insert your fullname.');
      return;
    }
    if (!this.newUser.email) {
      this.toastr.error('Please insert your email address.');
      return;
    }
    if (!this.newUser.password) {
      this.toastr.error('Please insert your password.');
      return;
    }
    if (!this.newUser.confirmpassword) {
      this.toastr.error('Please confirm your password.');
      return;
    }

    if (this.newUser.password != this.newUser.confirmpassword) {
      this.toastr.error(
        'Your password and confirmation password do not match.'
      );
      return;
    }

    this.authService.register(this.newUser).subscribe(
      res => {
        this.toastr.success('Please login to validate your registration');
        this.router.navigate(['text/login']);
      },
      err => {
        this.toastr.error('A problem occured while creating your account.');
      }
    );
  }
}
