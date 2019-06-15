import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Speech from 'speak-tts';
import { SpeechService } from 'ngx-speech';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  speech;

  constructor(private router: Router, public speechService: SpeechService) {
    this.speech = new Speech(); // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log('speech synthesis supported');
    }
  }

  ngOnInit() {
    this.speechService.start();
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
  }

  order() {
    console.log(true);

    this.router.navigate(['text/login']);
  }

  speak(text) {
    this.speech
      .speak({
        text: text
      })
      .then(() => {
        console.log('Success !');
      })
      .catch(e => {
        console.error('An error occurred :', e);
      });
  }

  public useSpeechModule(): void {
    this.router.navigate(['speech/login']);
  }

  public useTextModule(): void {
    this.router.navigate(['text/login']);
  }
}
