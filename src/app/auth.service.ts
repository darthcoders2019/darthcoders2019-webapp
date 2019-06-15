import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const AUTH_URL = 'https://darthcoders-backend.herokuapp.com/api/public/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: any) {
    const URL = AUTH_URL + 'login/';
    return this.http.post(URL, user);
  }

  register(user: any) {
    const URL = AUTH_URL + 'register/';
    return this.http.post(URL, user);
  }

}