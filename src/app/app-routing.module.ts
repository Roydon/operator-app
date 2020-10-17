import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'select-clinic',
    loadChildren: () => import('./select-clinic/select-clinic.module').then( m => m.SelectClinicPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'slot',
    loadChildren: () => import('./slot/slot.module').then( m => m.SlotPageModule)
  },
  {
    path: 'create-slot',
    loadChildren: () => import('./create-slot/create-slot.module').then( m => m.CreateSlotPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'cancel-appointment',
    loadChildren: () => import('./cancel-appointment/cancel-appointment.module').then( m => m.CancelAppointmentPageModule)
  },
  {
    path: 'create-appointment',
    loadChildren: () => import('./create-appointment/create-appointment.module').then( m => m.CreateAppointmentPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
