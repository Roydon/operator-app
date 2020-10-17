import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectClinicPageRoutingModule } from './select-clinic-routing.module';

import { SelectClinicPage } from './select-clinic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectClinicPageRoutingModule
  ],
  declarations: [SelectClinicPage]
})
export class SelectClinicPageModule {}
