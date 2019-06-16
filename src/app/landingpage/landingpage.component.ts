import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Speech from 'speak-tts';
import { SpeechService } from 'ngx-speech';
import { PostService } from '../post.service';

import * as moment from 'moment';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  speech;

  public post_list;

  constructor(private router: Router, public speechService: SpeechService, private postService: PostService) {
    this.speech = new Speech(); // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log('speech synthesis supported');
    }
    this.post_list = [];
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
    this.getPosts();
  }

  private getPosts(): void {
    const query: any = {
      'sort': '-post_date',
      'populate': 'user_id'
    }

    this.postService.getPosts(query).subscribe(
      (res: [any]) => {
        this.post_list = res.map((res_post) => {
          res_post.post_date = moment(res_post.post_date).format('DD/MM/YY HH:mm')
          return res_post;
        });
      },
      (err) => {
        // toast error
      });
  }

  order() {
    console.log(true);

    this.router.navigate(['text/login']);
  }

  speak(text, startSpeechAction) {
    if (startSpeechAction) this.speechService.start();
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
