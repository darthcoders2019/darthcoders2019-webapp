import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from './shared/messaging.service';

import { ThemeService } from './theme-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  message;

  constructor(
    private messagingService: MessagingService,
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit() {
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  useLanguage(language: string) {
    this.translateService.use(language);
  }

  public toggleFrenchLanguage(event): void {
    event && event.checked === true ? this.translateService.use("fr") : this.translateService.use("en");
  }

  public toggleDarkMode(event): void {
    event && event.checked === true ?  this.themeService.toggleDark() : this.themeService.toggleLight();
  }
}
