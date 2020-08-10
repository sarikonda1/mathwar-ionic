import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main-service.service';
import { SocketService } from '../Services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgUrl = '';
  constructor(private router: Router, public service: MainService, public socketService: SocketService) {
  }

  ionViewWillEnter(): void {
    if (localStorage.getItem('currentUser')) {
      this.service.userData = JSON.parse(localStorage.getItem('currentUser'));
      if (this.service.userData.userDetails && this.service.userData.userDetails.avatar) {
        this.imgUrl = this.service.userData.userDetails.avatar !== undefined ? this.socketService.BASE_URL + '/' + this.service.userData.userDetails.avatar : '';
      }
    }
  }
  ionViewDidEnter() {
    localStorage.setItem('canClosePage', '1');
  }
  onClickPractice(): void {
    this.router.navigate(['practice']);
  }
  onClickProfile(): void {
    if (this.checkIfUserLoggedIn('profile')) {
      this.router.navigate(['profile']);
    }
  }
  onClickBattle(): void {
    if (this.checkIfUserLoggedIn('battle')) {
      this.router.navigate(['battle']);
    }
  }
  onClickMathCruncher(): void {
    this.router.navigate(['practice/advanced-practice']);
  }
  onClickFriends(): void {
    this.router.navigate(['practice/sequence']);
  }
  onClickSettings(): void {
    this.router.navigate(['settings']);
  }
  checkIfUserLoggedIn(page): any {
    if (!this.service.isLoggedIn) {
      this.router.navigateByUrl('sign-up?fetchUrl=' + page);
      return false;
    }
    return true;
  }
}
