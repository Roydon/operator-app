import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public router: Router,public storage: Storage) {}

  goToProfile(){
    this.router.navigateByUrl('profile');
  }

  goToClinic(x){
  
    
      let navigationExtras ={
        queryParams: {
          special: x,
         
        }
      };   
      this.router.navigate(['select-clinic'], navigationExtras);
  
  }

 
 

  logout(){
    this.storage.remove('user');
    this.router.navigateByUrl('login');
  }

}
