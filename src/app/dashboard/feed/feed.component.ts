import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from "@angular/router";
import { PostService } from '../../post.service';
import { ImageService } from '../../image.service';
import * as moment from 'moment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {

  public post_list;
  public post: any;
  public url;

  private image;

  constructor(
    private postService: PostService,
    private ref: ChangeDetectorRef,
    private imageService: ImageService,
    private router: Router
  ) {
    this.post_list = [];
    this.post = {
      description: ''
    };
    this.url = '';
  }

  ngOnInit() {

    if (!sessionStorage.length || sessionStorage.getItem('token') == null) {
      this.router.navigate(['text/login']);
    } else {
      this.getPosts();
    }

  }

  private getPosts(): void {
    const query: any = {
      'sort': '-post_date',
      'populate': 'user_id'
    };

    this.postService.getPosts(query).subscribe(
      (res: [any]) => {
        this.post_list = res.map((res_post) => {
          res_post.post_date = moment(res_post.post_date).format('DD/MM/YY HH:mm A')
          return res_post;
        });
        this.ref.detectChanges();
      },
      (err) => {
        // toast error
      });
  }

  private insertPostInDB(): void {
    this.post.likes = Math.floor(Math.random() * 100);
    this.postService.updatePost(this.post).subscribe(
      (res) => {
        this.post = {
          description: ''
        };
        this.url = [];
        this.getPosts();
        this.ref.detectChanges();
      },
      (err) => {
        console.error(err);
      });
  }

  public createPost(): void {
    const user_id = sessionStorage.getItem('id');
    this.post.user_id = user_id;

    if (this.image) {
      const formData: FormData = new FormData();
      formData.append(
        'image',
        this.image,
        this.image.name
      );

      this.imageService.uploadImage(formData).subscribe(
        (res: any) => {
          this.post.image_url = res.url;
          this.post.image_name = this.image.name;
          this.insertPostInDB();
        },
        (err) => {
          console.error(err);
        });
    } else {
      this.insertPostInDB()
    }
  }

  public onSelectFile(event) {
    this.url = '';
    this.image = null;
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (loaded: any) => {
        this.url = loaded.target.result;
      }
    }
  }

  public goToMyPosts() {
    this.router.navigate(['dashboard/my-posts']);
  }

  public goToMySettings() {
    this.router.navigate(['dashboard/my-settings']);
  }

}
