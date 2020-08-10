import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SocketService } from '../Services/socket.service';
import { MainService } from '../main-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profileName: any;
  image = '';
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  imageUrl: any;
  base64 = '';


  constructor(private router: Router, public formBuilder: FormBuilder, public socketService: SocketService, public service: MainService,
    public cd: ChangeDetectorRef, public navigationControl: NavController) {
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      profileName: [null, Validators.required],
      file: [null],
    });
    this.imagePathset();

    this.profileName = this.currentUser?.userDetails.profileName;
    this.cd.detectChanges();

    this.profileForm.controls.profileName.setValue(this.profileName);
    this.establishSocketConnection();
  }
  imagePathset() {
    this.cd.detectChanges();
    this.image = this.currentUser?.userDetails?.avatar;
    this.imageUrl = (this.image === '' || this.image === undefined) ? this.imageUrl = '' : this.socketService.BASE_URL + '/' + this.image + '?t="' + new Date().getTime();
    this.cd.detectChanges();
  }
  async establishSocketConnection() {
    try {
      await this.socketService.connectSocket(this.currentUser?.userId);
    } catch (error) {
      alert('Something went wrong');
    }
  }
  onSubmit(): void {
    const oldProfile = this.currentUser?.userDetails?.avatar;

    const profileData = {
      userId: this.currentUser?.userId,
      profileName: this.profileForm.value.profileName,
      avatar: this.base64,
      oldAvatar: oldProfile
    };
    profileData.avatar = this.base64 !== ''
      ? this.base64 : JSON.parse(localStorage.getItem('base64'));

    profileData.oldAvatar = (this.base64 === '' || profileData.oldAvatar === profileData.avatar) ? null : profileData.oldAvatar;

    this.socketService.updateProfile(profileData).subscribe(response => {

      this.cd.detectChanges();
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.currentUser.userDetails.profileName = response.profileName;
      this.currentUser.userDetails.avatar = response.avatar;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      this.service.presentToast('Profile Updated Successfully');

      this.navigationControl.navigateRoot(['home']);
      this.imagePathset();
      this.cd.detectChanges();
    });

  }

  fileUpload(fileInput) {
    const reader = new FileReader();
    reader.readAsDataURL(fileInput?.target?.files[0]);
    reader.onload = () => {
      this.base64 = reader.result.toString();
      localStorage.setItem('base64', JSON.stringify(this.base64));
    };
  }
  isProfile(): boolean {
    this.imageUrl = (this.image === '' || this.image === undefined) ? this.imageUrl = '' : this.socketService.BASE_URL + '/' + this.image;

    this.imageUrl = this.base64 === '' ? this.imageUrl : this.base64;

    return (this.imageUrl === '' || this.imageUrl === undefined);
  }
}
