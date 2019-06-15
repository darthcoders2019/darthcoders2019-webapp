import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import Speech from 'speak-tts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { SpeechModule } from 'ngx-speech';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './shared/messaging.service';
import { AsyncPipe } from '@angular/common';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LandingpageComponent } from './landingpage/landingpage.component';

// import { SpeechModule } from './speech/speech.module';
import { TextModule } from './text/text.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { FeedComponent } from './dashboard/feed/feed.component';
import { SettingsComponent } from './user/settings/settings.component';
import { PostsComponent } from './user/posts/posts.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AuthGuard } from './auth.guard';
import { ApiInterceptor } from './api.interceptor';
import { PostComponent } from './shared/post/post.component';

@NgModule({
  declarations: [AppComponent, LandingpageComponent, FeedComponent, SettingsComponent, PostsComponent, PostComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SpeechModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatChipsModule,
    MatSlideToggleModule,
    TextModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    MessagingService,
    AsyncPipe,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    { provide: 'SPEECH_LANG', useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
