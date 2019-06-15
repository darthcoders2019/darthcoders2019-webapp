import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PostService } from '../../post.service';
import { ImageService } from '../../image.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public post_list;

  constructor(
    private postService: PostService,
    private imageService: ImageService,
    private router: Router
  ) { 
    this.post_list = [];
  }

  ngOnInit() {

    if (!sessionStorage.length || sessionStorage.getItem('token') == null) {
      this.router.navigate(['text/login']);
    }

  }

  private getPosts(): void {
    let query: any = {};

    this.postService.getPosts(query).subscribe(
      (res : [any]) => {
        this.post_list = res;
      },
      (err) => {
        // toast error
      });
  }

  public createPost():void {
    /*
    {
    image_url: {
        type: String
    },
    description: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [],
    post_date: {
        type: Date,
        default: new Date()
    },
    likes: {
        type: Number,
        default: 0
    }
} 
     */
  }

}
