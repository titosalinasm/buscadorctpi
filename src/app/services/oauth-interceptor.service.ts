import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { TokenService } from './token.service';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable()
export class OauthInterceptorService {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token$ = sessionStorage.getItem('access_token');
    if (token$) {
      request = request.clone({ setHeaders: { Authorization: 'Bearer ' + sessionStorage.getItem('access_token') } });
    }


    return next.handle(request).pipe(
      map(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
          return event;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          let data = {
            reason: error && error.error && error.error.reason ? error.error.reason : '',
            status: error.status
          };
          return throwError(error);
        }
      )
    );
  }
}
