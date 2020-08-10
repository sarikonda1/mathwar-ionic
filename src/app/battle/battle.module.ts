import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vibration } from '@ionic-native/vibration/ngx';
import { CanDeactivateGuard } from '../auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { BattleComponent } from './battle.component';
import { BattleRoutingModule } from './battle-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    BattleRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [BattleComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [Vibration, CanDeactivateGuard]
})
export class BattleModule {}
