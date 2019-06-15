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

        // if (req.url.includes('/arkeio/') || req.url.includes('/arkpos/') || req.url.includes('/arkregistry/api/secure/') || req.url.includes('/arksal/') || req.url.includes('/arkbill/') || req.url.includes('/arkbi/')) {
        //     if (sessionStorage.length > 0) {
        //       this.token = sessionStorage.getItem('token');


        //       const authorization = 'Bearer ' + this.token;
        //       const headers = (req.url.includes('upload/image') || req.url.includes('upload/file')) || req.url.includes('public/files') ? { 'Authorization': authorization } : { 'Content-Type': 'application/json', 'Authorization': authorization };
        //       req = req.clone({
        //         setHeaders: headers
        //       });
        //     }
        //   }

        return next.handle(req);
    }
}