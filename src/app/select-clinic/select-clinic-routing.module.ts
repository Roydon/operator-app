import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectClinicPage } from './select-clinic.page';

const routes: Routes = [
  {
    path: '',
    component: SelectClinicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectClinicPageRoutingModule {}
