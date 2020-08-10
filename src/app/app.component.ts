import { Component, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';

import { Platform, LoadingController, NavController, AlertController, MenuController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { MainService } from './main-service.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public service: MainService,
    public loadingcntl: LoadingController,
    public navCtrl: NavController,
    public alert: AlertController,
    private cd: ChangeDetectorRef,
    public menuController: MenuController,
    public modelController: ModalController,
    private nativeAudio: NativeAudio,
    private insomnia: Insomnia,
    private lottieSplashScreen: LottieSplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.lottieSplashScreen.show('assets/animation/splash.json', false, 1024, 768);
      setTimeout(() => {
      this.lottieSplashScreen.hide();
     }, 10000);
      this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
      this.onBackButtonAction();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.cd.markForCheck();
      this.statusBar.backgroundColorByHexString('#1585aa');
      // this.nativeAudio.preloadSimple('uniqueId1', 'path/to/file.mp3').then(this.onSuccess, this.onError);
      // this.nativeAudio.preloadComplex('uniqueId2', 'path/to/file2.mp3', 1, 1, 0).then(this.onSuccess, this.onError);
      // this.nativeAudio.play('uniqueId1').then(this.onSuccess, this.onError);
      if (this.service.settings.music){
        this.nativeAudio.preloadComplex('uniqueKey1', 'assets/audio/inspire-tone.mp3', 1, 1, 0).then(() => {
          this.nativeAudio.loop('uniqueKey1');
        });
      }
      this.nativeAudio.preloadSimple('uniqueKey2', 'assets/audio/success-tone.mp3').then(() => {
      });
      this.nativeAudio.preloadSimple('uniqueKey3', 'assets/audio/wrong-tone.mp3').then(() => {
      });
    });
  }
  onSuccess(data): void{
  }
  onError(data): void{
  }
  onBackButtonAction(): void {
    let lastTimeBackPress = 0;
    const timePeriodToExit = 2000;
    this.platform.backButton.subscribeWithPriority(9999, async () => {
      const elementMenu = await this.service.menucontroller.isOpen();
      const element = await this.loadingcntl.getTop();
      const elementAlert = await this.alert.getTop();

      const elementPop = await this.service.actionSheet.getTop();
      const modelPop = await this.modelController.getTop();
      if (elementPop) {
        this.service.actionSheet.dismiss();
        return;
      }
      if (modelPop) {
        this.modelController.dismiss();
        return;
      } else if (elementAlert) {
        elementAlert.dismiss();
        return;
      } else if (element) {
        return;
      } else if (elementMenu) {
        this.service.menucontroller.close();
        return;
      } else {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
            outlet.pop();
          } else {
            if ((new Date().getTime() - lastTimeBackPress) < timePeriodToExit) {
              this.nativeAudio.unload('uniqueKey1');
              navigator['app'].exitApp();
            } else {
              if (this.router.url !== '/home' && this.service.isLoggedIn) {
                    this.navCtrl.navigateRoot('/home');
              } else {
                this.service.presentToast('Press again to exit', true);
                lastTimeBackPress = new Date().getTime();
              }
            }
            return false;
          }
        });
      }
    });
  }
}
