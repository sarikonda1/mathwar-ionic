import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { LoadingController, ToastController, MenuController, ActionSheetController, ModalController, AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SocketService } from './service/socket.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public leaveRoom: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  baseUrl: any;
  urls: any;
  isLoggedIn = false;
  categories: any[] = [];
  get isLoggedInn() {
    if (localStorage.getItem('currentUser')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }
  isLoaderPresent = false;
  loading: any;
  noConnection = 'No Internet Connection';
  isOnline = true;
  userData: any;
  questionsInfo: any;
  shouldPresentLoader = false;
  settings: any = {
    music: true,
    vibration: true,
    jingleMusic: true
  };
  timeLeft: number = 180;
  interval;
  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public menucontroller: MenuController, public actionSheet: ActionSheetController, public http: HttpClient,
    public modalController: ModalController, public alertController: AlertController, public router: Router,
    private navCtrl: NavController, private nativeAudio: NativeAudio, private socketService: SocketService) {
    this.setAPis();
    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn = true;
      this.userData = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.isLoggedIn = false;
      this.userData = null;
    }
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }

    // this.network.onDisconnect().subscribe(() => {
    //   this.isOnline = false;
    // });
    // this.network.onConnect().subscribe(() => {
    //   this.isOnline = true;
    // });
  }

  setAPis() {
    this.baseUrl = '';
    this.urls = [];

  }
  errorHandle(err) {
    if (err.status === 401) {
      this.isLoggedIn = false;
      localStorage.clear();
    }
  }
  async presentToast(text, isError = false) {
    const toast = await this.toastCtrl.create({
      message: text,
      color: isError ? 'danger' : 'success',
      duration: 3000,
      cssClass: 'error-toast-color ion-margin-bottom ion-padding-bottom',
    });
    toast.present();
  }
  async presentLoading(text = '') {
    if (!this.isLoaderPresent) {
      this.isLoaderPresent = true;
      text = text ? text : 'Loading Please Wait...';
      this.loading = await this.loadingCtrl.create({
        spinner: 'crescent',
        message: text,
        // translucent: true,
        // cssClass: 'custom-class custom-loading',
        showBackdrop: false,
        // spinner: null,
        // message: '<ion-img src="assets/images/loader.gif"></ion-img>',
        // cssClass: 'custom-loading'
      });
      this.loading.present();
    }
  }
  async dismissLoading() {
    // if (this.isLoaderPresent && this.loading) {
    //   this.loading.dismiss();
    //   const element = await this.loadingcntl.getTop();
    //   if (element) {
    //     element.dismiss();
    //   }
    //   this.isLoaderPresent = false;
    // }
    if (!this.shouldPresentLoader) {
      const element = await this.loadingCtrl.getTop();
      if (element) {
        element.dismiss();
      }
      this.isLoaderPresent = false;
    }
  }
  async presentAlertConfirm() {
    let pageName;
    if (location.pathname.indexOf('battle') > -1) {
      pageName = 'Battle';
    } else if (location.pathname.indexOf('advanced') > -1) {
      pageName = 'Number Cruncher';
    } else {
      pageName = 'Practice';
    }
    const that = this;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Confirm',
      message: `Are you sure you want to quit your ${pageName} ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          cssClass: 'primary',
          handler: () => {
            localStorage.removeItem('canClosePage');
            pageName === 'Battle' ? this.setLeaveRoom(true) : this.setLeaveRoom(false);

            this.getLeaveRoomStatus().subscribe(res => {
              const gameStatus = JSON.parse(localStorage.getItem('gameStatus'));
              const gameId = JSON.parse(localStorage.getItem('gameId'));
              if (res && gameStatus) {
                if (gameId !== undefined) {
                  this.socketService.leaveGame(this.userData.userId, gameId);
                }
                this.socketService.leaveLobby(this.userData.userId, gameStatus.lobbyId);
              }
            });
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();
  }
  modelAlert() {
    this.popUp();
    return localStorage.getItem('canClosePage') ? false : true;
  }
  async popUp() {
    const elementAlert = await this.alertController.getTop();
    if (!elementAlert && localStorage.getItem('canClosePage')) {
      this.presentAlertConfirm();
    }
  }

  preventSpace(event: any, form?: any, key?: any): void {
    if (((event.keyCode === 32) || (event.keyCode === 8) || event.keyCode === 46) && event.srcElement.value.trim() === '') {
      event.preventDefault();
    }
    if (form && key && form.controls[key] !== undefined) {
      form.controls[key].setValue(event.srcElement.value.trimLeft());
    }
    else {
      event.srcElement.value = event.srcElement.value.trimLeft();
    }

  }
  // prevent spaces at on blur text fields
  trimSpaces(formGroup: any, key: string): void {
    formGroup.controls[key].setValue(formGroup.controls[key].value ? formGroup.controls[key].value.replace(/^\s+|\s+$/gm, '') : null);
  }
  storeUserDetails(user) {
    this.isLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  onChange(isMusicChanged = false): void {
    this.setSetting();
    if (isMusicChanged) {
      if (this.settings.music) {
        this.nativeAudio.preloadComplex('uniqueKey1', 'assets/audio/inspire-tone.mp3', 1, 1, 0).then(() => {
          this.nativeAudio.loop('uniqueKey1');
        });
      } else {
        this.nativeAudio.unload('uniqueKey1');
      }
    }
  }
  onChangeJingleMusic(): void {
    this.setSetting();
  }
  setSetting(): void {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
  onSkipNavigation(): void {
    localStorage.setItem('isUserSkiped', '1');
    this.navCtrl.navigateRoot('home');
  }
  onLoggedUserRedirection(data): void {
    const urlParams = new URLSearchParams(window.location.search);
    const page_type = urlParams.get('fetchUrl');
    this.storeUserDetails(data);
    if (page_type) {
      this.router.navigate([page_type], { replaceUrl: true });
    } else {
      this.navCtrl.navigateRoot(['home']);
    }
  }
  async onLogout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Confirm',
      message: `Are you sure you want to Logout ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          cssClass: 'primary',
          handler: () => {
            localStorage.clear();
            this.isLoggedIn = false;
            this.userData = null;
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });

    await alert.present();
  }
  startTimer(time = 180) {
    this.timeLeft = time;
    clearInterval(this.interval);
    setTimeout(() => {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        }
      }, 1000);
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.interval);
  }
  setLeaveRoom(input): void {
    this.leaveRoom.next(input);
  }

  getLeaveRoomStatus(): Observable<any> {
    return this.leaveRoom.asObservable();
  }
  onCorrectAnswer(): void {
    if (this.settings.jingleMusic) {
      this.nativeAudio.play('uniqueKey2');
    }
  }
  onWrongAnswer(): void {
    if (this.settings.jingleMusic) {
      this.nativeAudio.play('uniqueKey3');
    }
  }
}
