import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../auth.guard';
import { BattleComponent } from './battle.component';

const routes: Routes = [
    {
        path: '',
        component: BattleComponent,
        canDeactivate: [CanDeactivateGuard]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattleRoutingModule {}
