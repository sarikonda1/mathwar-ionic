import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard, LoggedInAuthGuard } from './auth.guard';
import { HomePage } from './home/home.page';
import { MathLoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'home',
    // canActivate: [AuthGuard],
    component: HomePage,
    // canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: MathLoginComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'practice',
    loadChildren: () => import('./practice/practice.module').then( m => m.PracticePageModule)
  },
  {
    path: 'battle',
    loadChildren: () => import('./battle/battle.module').then( m => m.BattleModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //     path: '',
  //     redirectTo: 'login',
  //     pathMatch: 'full'
  //   },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
