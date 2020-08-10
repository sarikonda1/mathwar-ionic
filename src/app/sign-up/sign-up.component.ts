import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../Services';
import { first, combineAll } from 'rxjs/operators';
import { MainService } from '../main-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signupForm: FormGroup;
  validationMessage: any;
  public defaultHeaders = new HttpHeaders();


  constructor(private formBuilder: FormBuilder, private router: Router, protected httpClient: HttpClient, private authenticationService: AuthenticationService, public service: MainService, private navCtrl: NavController) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
    });
  }

  ngOnInit() {
   
  }
  ionViewWillEnter(){
    this.signupForm.reset();
  }
  loginPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageType = urlParams.get('fetchUrl');
    this.router.navigateByUrl(`login` + (pageType ? `?fetchUrl=${pageType}` : ''));
  }
  onSignUp(): void {
    if (this.signupForm.valid) {
      this.authenticationService.signup(this.signupForm.value.username, this.signupForm.value.password, this.signupForm.value.email)
        .subscribe(data => {
          if (!data.error) {
            this.service.onLoggedUserRedirection(data);
          }
          else {
            this.service.presentToast(data.message, true);
          }
        },
          error => {
            this.service.presentToast(error.message, true);
          });
    }
    else {
      this.signupForm.markAllAsTouched();

    }
  }
  preventSpace(event: any, form?: any, key?: any): void {
    this.service.preventSpace(event, form, key);
  }

  trimSpaces(formGroup: any, key: string): void {
    this.service.trimSpaces(formGroup, key);
  }

}
