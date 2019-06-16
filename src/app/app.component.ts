import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from './shared/messaging.service';
import Speech from 'speak-tts';

import { ThemeService } from './theme-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'darthcoders2019-webapp';
  speech;
  message;

  constructor(
    private messagingService: MessagingService,
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {
    this.speech = new Speech(); // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log('speech synthesis supported');
    }
    this.translateService.setDefaultLang('en');
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
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  speak() {
    this.speech
      .speak({
        text: 'ki gogot tashley'
      })
      .then(() => {
        console.log('Success !');
      })
      .catch(e => {
        console.error('An error occurred :', e);
      });
  }

  useLanguage(language: string) {
    if (language == 'fr')
      this.speech.init({
        volume: 1,
        lang: 'fr-CA',
        rate: 1,
        pitch: 1,
        voice: 'Amelie',
        splitSentences: true,
        listeners: {
          onvoiceschanged: voices => {
            //console.log('Event voiceschanged', voices);
          }
        }
      });
    else
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

    this.translateService.use(language);
  }

  public toggleFrenchLanguage(event): void {
    event && event.checked === true
      ? this.translateService.use('fr')
      : this.translateService.use('en');
  }

  public toggleDarkMode(event): void {
    event && event.checked === true
      ? this.themeService.toggleDark()
      : this.themeService.toggleLight();
  }
}
