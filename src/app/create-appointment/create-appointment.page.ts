import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import {AuthService} from '../auth.service'
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.page.html',
  styleUrls: ['./create-appointment.page.scss'],
})
export class CreateAppointmentPage implements OnInit {

  user={};
  slotData:any={};
  mobile;
  name;
  dob;
  doctorName;
  clinicName;
  clinic:any={};
  button:boolean=false;
  userId;
  clinicId;
  slotDate;
  slotTimings:any=[];
  currentSelected;
  doctorId;
  doctorMobile;
  clinicAddress;
  selectedDate;
  starttime;
  endtime;
  slotTimes:any={};
  selectedAppointment:any={};
  selectedSlot:any={};
  firstName;
  middleName;
  lastName;


  previousIndex;

timeSelected:boolean=false;

  constructor(public route: ActivatedRoute,public storage: Storage,public router: Router,public navCtrl:NavController,
    private authService: AuthService,public httpClient: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        var details = JSON.parse(params.special);
        this.selectedSlot=details;
        this.clinicAddress=params.clinicAddress;
        this.clinicName=params.clinicName;
        this.clinicId=params.clinicId;
        this.selectedDate=params.selectedDate;
       
        this.slotTimes=JSON.parse(params.slotTimings);
        this.slotTimes[params.index].isBooked=true;
      }
    });
   }

  ngOnInit() {
    this.storage.get('user').then((user)=>{
      this.doctorName=user.doctorName;
      this.doctorMobile=user.doctorMobile;
      this.doctorId=user._id;
    });
  }

  search(){
    var emailId=this.makeid(6);
    var obj={"contactNum":this.mobile,emailId:emailId,emailIdRegistered:false};          
       this.authService.signupUser(obj).subscribe((data:any) => { 
         if(data.success){
          this.userId=data.user._id;
          this.user=data.user;
          this.button=true;
         }else{
          this.button=false;
         }
       });
    
  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  create(){

    var reqObj = {
      appointmentDate :this.selectedDate,
      appointmentStartTime : this.selectedSlot.starttime,
   
     doctorId :this.doctorId,
      clinicId : this.clinicId,
    
      appointmentEndTime : this.selectedSlot.endTime,
     doctorMobile : this.doctorMobile,
     doctorName:this.doctorName,
     clinicName : this.clinicName,
     clinicAddress : this.clinicAddress,
     slotArray:JSON.stringify(this.slotTimes),
     patientId:this.userId,
        patientFirstName: this.firstName,
        patientMiddleName: this.middleName,
        patientLastName: this.lastName,
        patientMobile:this.mobile,
        patientDob:this.dob,
        isOnlineAppointment:false
    }     
          this.authService.newUserAppointment(reqObj).subscribe((data:any) => { 
         if(data.success){
        this.back();
         }
      });
  }

  back() {
    this.router.navigateByUrl('tabs/tab1');   
  }

  

}
