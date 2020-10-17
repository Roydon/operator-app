import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSlotPageRoutingModule } from './create-slot-routing.module';

import { CreateSlotPage } from './create-slot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSlotPageRoutingModule
  ],
  declarations: [CreateSlotPage]
})
export class CreateSlotPageModule {}
