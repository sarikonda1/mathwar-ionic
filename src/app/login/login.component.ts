import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../Services';
import { MainService } from '../main-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class MathLoginComponent implements OnInit {
  public loginForm: FormGroup;
  validationMessage: any;
  public defaultHeaders = new HttpHeaders();
  checkBox = false;
  constructor(private formBuilder: FormBuilder, private router: Router, protected httpClient: HttpClient, private authenticationService: AuthenticationService, public service: MainService, private navCtrl: NavController) {
    
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
    this.loginForm.reset();
  }

  ionViewWillEnter(): void{
    this.loginForm.reset();
  }
  register(){
    const urlParams = new URLSearchParams(window.location.search);
    const page_type = urlParams.get('fetchUrl');
    this.router.navigateByUrl(`sign-up` + (page_type ? `?fetchUrl=${page_type}` : ''));
  }
  onLogin(): void {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          data => {
            this.service.onLoggedUserRedirection(data);
          },
          error => {
            this.service.presentToast('Invalid User Name or Password', true);
          });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  preventSpace(event: any, form?: any, key?: any): void {
    this.service.preventSpace(event, form, key);
  }

  trimSpaces(formGroup: any, key: string): void {
    this.service.trimSpaces(formGroup, key);
  }
  onChange(): void{
    this.checkBox = this.checkBox ? false : true;
  }
}

