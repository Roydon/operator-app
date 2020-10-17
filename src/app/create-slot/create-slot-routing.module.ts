import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSlotPage } from './create-slot.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSlotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSlotPageRoutingModule {}
