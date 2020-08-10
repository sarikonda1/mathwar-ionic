import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeComponent } from './practice.component';
import { AdvancedPracticeComponent } from './advanced-practice/advanced-practice.component';
import { CanDeactivateGuard } from '../auth.guard';
import { SequenceComponent } from './sequence/sequence.component';

const routes: Routes = [
  {
    path: '',
    component: PracticeComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'advanced-practice',
    component: AdvancedPracticeComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'sequence',
    component: SequenceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticePageRoutingModule {}
