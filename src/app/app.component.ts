import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from './shared/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'darthcoders2019-webapp';

  message;

  constructor(
    private messagingService: MessagingService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('fr');
  }

  ngOnInit() {
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
