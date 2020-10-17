import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.page.html',
  styleUrls: ['./cancel-appointment.page.scss'],
})
export class CancelAppointmentPage implements OnInit {

  selectedAppointment:any={};
  slotArray=[];
  slotId;
  middleName;

  constructor(public route: ActivatedRoute,public router: Router,public httpClient: HttpClient, public navCtrl:NavController,
    public authService:AuthService) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        var details = JSON.parse(params.special);
        this.selectedAppointment=details;
        this.middleName=this.selectedAppointment.patientMiddleName.charAt(0);
      }
    });
  }

  ngOnInit() {
      var obj={"clinicId":this.selectedAppointment.clinicId,
      'slotDate':this.selectedAppointment.appointmentDate};          
         this.authService.getSlot(obj).subscribe((data:any) => {
      this.slotArray=data.data.slotTimings;
      this.slotId= data.data._id;
      this.slotArray.forEach(element => {
        if(element.starttime==this.selectedAppointment.appointmentStartTime){
          element.isBooked=false;
        }
      });
    });
  }

  cancel(){
   var slotFinalArray = JSON.stringify(this.slotArray);
      var obj={"slotId":this.slotId,'slotArray':slotFinalArray,
      'appointmentId':this.selectedAppointment._id,
      'patientId':this.selectedAppointment.patientId,
      'doctorName':this.selectedAppointment.doctorName,
      'appointmentDate':this.selectedAppointment.appointmentDate};          
         this.authService.cancelAppointment(obj).subscribe((data:any) => {
    if(data.success){
      this.authService.presentToast(data.msg);
      this.navCtrl.navigateRoot(["tabs/tab1"]);
    }else{
      this.authService.presentToast(data.msg);
    }
     
    });
    
  }

  back() {
    this.router.navigateByUrl('tabs/tab1');   
  }

}
