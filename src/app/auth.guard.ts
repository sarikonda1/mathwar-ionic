import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { MainService } from './main-service.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, public service: MainService, public navCtrl: NavController) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
     return this.service.isLoggedInn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
            if (isLoggedIn){
              return true;
            } else{
              this.navCtrl.navigateRoot('login');
               return false;
            }
          // if (!isLoggedIn && !localStorage.getItem('isUserSkiped')) {
          //   this.service.isLoggedIn = false;
          //   this.navCtrl.navigateRoot('login');
          //   return false;
          // }
          // this.service.isLoggedIn = true;
          // return true;
        })
      );
  }
}
@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {

    constructor(private service: MainService, private _router: Router, public navCtrl: NavController) { }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
       return this.service.isLoggedInn.pipe(
          take(1),
          map((isLoggedIn: boolean) => {
              if (isLoggedIn){
                this.navCtrl.navigateRoot('home');
                return false;
              } else{
                return true;
              }
          })
        );
    }
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<MainService> {
  constructor(public service: MainService){}
    canDeactivate() {
      return this.service.modelAlert();
    }
};