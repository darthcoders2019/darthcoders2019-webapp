import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const IMAGE_URL = 'https://darthcoders-backend.herokuapp.com/api/public/images/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  // uploadImage(formData) {
  //   //image = image
  //   //Response.url
  // }

  uploadDoc(formData) {
    return this.http.post(IMAGE_URL, formData);
  }

  
}
