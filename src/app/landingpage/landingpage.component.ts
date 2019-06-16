import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Speech from 'speak-tts';
import { SpeechService } from 'ngx-speech';
import { PostService } from '../post.service';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  speech;
  title;

  public post_list;
  public p;

  constructor(
    private router: Router,
    public speechService: SpeechService,
    private postService: PostService,
    private translateService: TranslateService
  ) {
    this.speech = new Speech(); // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log('speech synthesis supported');
    }
    this.post_list = [];
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
    this.getPosts();
  }

  private getPosts(): void {
    const query: any = {
      // sort: '-post_date',
      // populate: 'user_id'
    };

    this.postService.getPosts(query).subscribe(
      (res: [any]) => {
        console.log(res);

        this.post_list = res.map(res_post => {
          res_post.post_date = moment(res_post.post_date).format(
            'DD/MM/YY HH:mm A'
          );
          return res_post;
        });

        this.post_list.forEach(post => {
          post.index =
            'Post by' +
            post.user_id.fullname +
            'with description' +
            post.description +
            'and image description' +
            post.image_name +
            'on' +
            post.post_date +
            'with' +
            post.likes +
            'likes';
        });
      },
      err => {
        // toast error
      }
    );
  }

  order() {
    this.speech
      .speak({
        text: 'successful',
        queue: false
      })
      .then(() => {})
      .catch(e => {
        console.error('An error occurred :', e);
      });

    localStorage.setItem('key_selected', 'speech');
    this.router.navigate(['text/login']);
  }

  order1() {
    this.speech
      .speak({
        text: 'successful',
        queue: false
      })
      .then(() => {})
      .catch(e => {
        console.error('An error occurred :', e);
      });

    localStorage.setItem('key_selected', 'text');
    this.router.navigate(['text/login']);
  }

  speak_pagination(event) {
    console.log(event);
  }
  speak(text, startSpeechAction) {
    if (startSpeechAction) this.speechService.start();
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

  public useSpeechModule(): void {
    localStorage.setItem('key_selected', 'speech');
    this.router.navigate(['text/login']);
  }

  public useTextModule(): void {
    localStorage.setItem('key_selected', 'text');
    this.router.navigate(['text/login']);
  }
}
