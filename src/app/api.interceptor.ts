import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    private token;

    constructor(private router: Router) {
        this.token = '';
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(req, 'req')
        if (req.url.includes('/private/')) {
            if (sessionStorage.length > 0) {
                this.token = sessionStorage.getItem('token');

                const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token };

                req = req.clone({
                    setHeaders: headers
                });
            }
        }


        return next.handle(req);
    }
}