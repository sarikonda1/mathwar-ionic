import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PracticePageRoutingModule } from './practice-routing.module';
import { PracticeComponent } from './practice.component';
import { AdvancedPracticeComponent } from './advanced-practice/advanced-practice.component';
import { SequenceComponent } from './sequence/sequence.component';
import { Vibration } from '@ionic-native/vibration/ngx';
import { CanDeactivateGuard } from '../auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    PracticePageRoutingModule,
    SharedModule
  ],
  declarations: [PracticeComponent, AdvancedPracticeComponent, SequenceComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [Vibration, CanDeactivateGuard]
})
export class PracticePageModule {}
