import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomePage } from './home/home.page';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { MainService } from './main-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptors';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { MathLoginComponent } from './login/login.component';
import { ValidatorsComponent } from './validators/validators.component';
import { SettingsComponent } from './settings/settings.component';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';

@NgModule({
  declarations: [AppComponent, SettingsComponent, ValidatorsComponent, HomePage, SignUpComponent, ProfileComponent, MathLoginComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    MainService,
    NativeAudio,
    Insomnia,
    LottieSplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
