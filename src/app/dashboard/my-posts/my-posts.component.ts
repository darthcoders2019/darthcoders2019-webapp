import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';

import { Router } from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  public my_posts_list;

  constructor(private postService: PostService, private router: Router) {
    this.my_posts_list = [];
  }

  ngOnInit() {
    this.getMyPosts();
  }

  private getMyPosts() {
    const user_id = sessionStorage.getItem("id");

    const query: any = {
      'user_id': user_id,
      // 'populate': 'user_id',
      // 'sort': '-post_date'
    };

    this.postService.myposts(query).subscribe(
      (res: [any]) => {
        console.log(res)
        this.my_posts_list = res.map((res_post) => {
          res_post.post_date = moment(res_post.post_date).format('DD/MM/YY HH:mm A')
          return res_post;
        });
      },
      (err) => {
        // toast error
      }
    );
  }

  public goToMyFeed() {
    this.router.navigate(['dashboard/feed']);
  }

  public goToMySettings() {
    this.router.navigate(['dashboard/my-settings']);
  }

}
