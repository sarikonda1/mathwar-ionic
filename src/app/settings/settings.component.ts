import { Component, OnInit } from '@angular/core';
import { MainService } from '../main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(public service: MainService, public router: Router) { }

  ngOnInit() {
  }
  onLogin(onLogin = false): void{
    if (onLogin){
      this.router.navigateByUrl('login');
    } else{
      this.router.navigateByUrl('sign-up');
    }
  }
}
