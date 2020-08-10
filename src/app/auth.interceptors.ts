import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError,retry,tap, map } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainService } from './main-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isLoaderPresent = false;
  loading: any;
  constructor(public router: Router, public service: MainService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!navigator.onLine) {
        this.service.presentToast('No Internet Connection', true);
        return Observable.throw(new HttpErrorResponse({ error: 'Internet is required.' }));
      }
      if (req.url.indexOf('login') > -1 || req.url.indexOf('register') > -1 || req.url.indexOf('category-questions') > -1) {
        this.service.presentLoading();
      }
      const token = localStorage.getItem('advanced-backend');
      let authReq;
      if (req.url.indexOf('login') === -1 && req.url.indexOf('register') === -1) {
        authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
      } else {
        authReq = req;
      }

      return next.handle(authReq).pipe(
        map((event: HttpEvent<any>) => {
          this.service.dismissLoading();
          if (event instanceof HttpResponse) {
            return event;
            // if (+event.body.status === 200) {
            //   return event;
            // } else {
            //   this.service.presentToast(event.body.message, true);
            //   return null;
            // }
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorHandle(error);
          // let data = {};
          // data = {
          //     reason: error && error.error ? error.error : '',
          //     status: error.status
          // };
          // this.service.shouldPresentLoader = false;
          // this.service.dismissLoading();
          // // this.errorHandle(error);
          // return throwError(data);
          return throwError(error);
      }));
  }
  errorHandle(err) {
    this.service.dismissLoading();
    if (err.status === 401) {
        this.service.isLoggedIn = false;
        localStorage.clear();
        this.router.navigate(['/login']);
    }
  }
}
