import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from './shared/messaging.service';
import {Router} from "@angular/router";
import Speech from 'speak-tts';

import { ThemeService } from './theme-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title;
  speech;
  message;
  isDarkModeOn;
  isSignedIn: boolean;

  constructor(
    private messagingService: MessagingService,
    private router: Router,
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {
    this.speech = new Speech(); // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) {
      console.log('Speech synthesis is supported');
    }
    this.translateService.setDefaultLang('en');
    this.isSignedIn = false;
  }

  ngOnInit() {
    this.translateService
      .get('landingPage', { value: 'title' })
      .subscribe((res: any) => {
        this.title = res.title;
      });

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

    this.isDarkModeOn = true;
    if (localStorage.length) {
      const savedTheme = localStorage.getItem("theme");
      this.isDarkModeOn = (savedTheme == "dark");
    }

    this.toggleDarkMode({checked: this.isDarkModeOn})
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    if (!sessionStorage.length || sessionStorage.getItem('token') == null) {
      this.isSignedIn = false;
    } else {
      this.isSignedIn = true;
    }
    
  }

  speak(text) {
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

    // this.translateService.use(language);
  }

  public toggleFrenchLanguage(event): void {
    event && event.checked === true
      ? this.translateService.use('fr')
      : this.translateService.use('en');

    if (event && event.checked === true)
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

    this.translateService
      .get('landingPage', { value: 'title' })
      .subscribe((res: any) => {
        this.title = res.title;
      });
  }

  public toggleDarkMode(event): void {
    event && event.checked === true
      ? this.themeService.toggleDark()
      : this.themeService.toggleLight();

    if (event && event.checked === true) {
      this.speak('Dark theme selected');
      localStorage.setItem("theme", "dark");
    } else {
      this.speak('Light theme selected');
      localStorage.setItem("theme", "light")
    }
  }

  public logout() {
    sessionStorage.clear();
    this.router.navigate(['home']);
    location.reload();
  }
}
