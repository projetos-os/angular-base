import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../config/app.settings';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {
    header: object;
    constructor(private router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        let login: boolean = false;

        if (req.url == AppSettings.APP_URL + '/oauth/token') {
            this.header = { "name": "Authorization", "value": "Basic " + AppSettings.APP_CLIENT_HASH };
        } else {
            this.header = { "name": "Authorization", "value": "bearer " + localStorage.getItem('access_token') };
        }

        const dupReq = req.clone({
            headers: req.headers.set(this.header['name'], this.header['value']),
        });
        return next.handle(dupReq).pipe(
            tap((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {

                }
            }),
            catchError(response => {
                if (response instanceof HttpErrorResponse) {

                    if (response.status == 401) {
                        this.router.navigate(['/login'])
                    }
                }

                return throwError(response);
            })
        )
    }


}


@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpsRequestInterceptor,
            multi: true,
        },
    ],
})


export class Interceptor { }