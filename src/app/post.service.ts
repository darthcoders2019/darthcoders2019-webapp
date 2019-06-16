import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const POST_URL = 'https://darthcoders-backend.herokuapp.com/api/public/posts/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(query?) {
    return this.http.get(POST_URL, { params: query });
  }

  getPostById(post_id) {
    return this.http.get(POST_URL + `${post_id}`);
  }

  updatePost(post) {
    let method = 'post';

    if (post.id) {
      method = 'put';
    }

    return this.http[method](POST_URL + `${post.id || ''}`, post);
  }

  myposts(query?) {
    const _MYPOSTURL = "https://darthcoders-backend.herokuapp.com/api/private/myposts/";
    return this.http.get(_MYPOSTURL, { params: query});
  }

  deletePosts(post_id) {
    return this.http.delete(POST_URL);
  }
}
