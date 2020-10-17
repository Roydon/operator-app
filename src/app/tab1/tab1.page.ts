import { Component ,OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { element } from 'protractor';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  dateFinal;

  doctorId: any;
  appointmentArray=[];
  dateNew;
  todayDate;
  noAppointment:boolean=false;
  clinicName:any;
  clinicArray=[];
  doctorName:any;
  clinicId;
  slotTimings=[];
  selectedAppointment:any={};
  clinicAddress;
  datePicker:boolean=false;
  previousIndex;

  currentSelected;
  timeSelected:boolean=false;

  constructor(public storage: Storage,public httpClient: HttpClient,public router: Router,
    public route: ActivatedRoute,public authService: AuthService) {
      
  }


  ionViewWillEnter(){
    this.dateNew=moment().format('DD/MM/YYYY');
      this.storage.get('user').then((res)=>{
        this.doctorName= res.doctorName;
        this.doctorId=res._id;    
          var obj={"doctorId":this.doctorId};          
          this.authService.getAllClinic(obj).subscribe((data:any) => {
          if(data.success==true){
            this.clinicArray=data.data;
            this.clinicName=this.clinicArray[0].clinicName;         
            this.clinicId=this.clinicArray[0]._id;
            this.clinicAddress=this.clinicArray[0].clinicAddress;
            var dateNow = moment(this.dateNew).format('DD/MM/YYYY');
              var obj={"clinicId":this.clinicId,'slotDate':this.dateNew};          
              this.authService.getSlot(obj).subscribe((data:any) => {
            if(data.success){
              if(data.data==null){
                this.authService.presentToast('No Slots');
              }else{
                this.slotTimings=data.data.slotTimings;
              }     
            }else{
              this.authService.presentToast(data.msg);
            }
    });
       
      }
      })
    })
  }
  

  ngOnInit(){

  }

    segment(i) {
    this.clinicName='';
   this.slotTimings=[];
    this.clinicName=this.clinicArray[i].clinicName;
    this.clinicId=this.clinicArray[i]._id;
    
      var dateNow = moment(this.dateNew).format('DD/MM/YYYY');
        var obj={"clinicId":this.clinicId,'slotDate':this.dateNew};          
        this.authService.getSlot(obj).subscribe((data:any) => {
        if(data.success){
          if(data.data==null){
            this.authService.presentToast('No Slots');
          }else{
            this.slotTimings=data.data.slotTimings;
          }     
        }else{
          this.authService.presentToast(data.msg);
        }
      });
   
    
}

 
  

  dateChange(){
      var dateNow= moment(this.dateFinal).format("DD/MM/YYYY");
      this.slotTimings=[];
      this.dateNew=dateNow; 
        var obj={"clinicId":this.clinicId,'slotDate':dateNow};          
              this.authService.getSlot(obj).subscribe((data:any) => {      
        if(data.success){
          if(data.data==null||data.data==undefined||data.data.length==0){
            this.authService.presentToast('No Slots');
          }else{
            this.slotTimings=data.data.slotTimings;
          } 
        }else{
          this.authService.presentToast(data.msg);
        }
      });   
  }


  nextDate(){
    if(this.datePicker){
      var dateNow = moment(this.dateNew).add(1, 'days').format('DD/MM/YYYY');
      this.datePicker=false;
    }else{
      var dateNow = moment(this.dateNew , "DD/MM/YYYY").add(1, 'days').format('DD/MM/YYYY');
    }
    this.dateNew=dateNow;
    this.dateNew=dateNow;
    this.slotTimings=[];
        var obj={"clinicId":this.clinicId,'slotDate':dateNow};          
        this.authService.getSlot(obj).subscribe((data:any) => {    
        if(data.success){         
          if(data.data==null||data.data==undefined||data.data.length==0){
            this.authService.presentToast('No Slots');
          }else{
            this.slotTimings=data.data.slotTimings;       
          }    
        }else{
          this.authService.presentToast(data.msg);
        }
      });  
  }

  previousDate(){
    if(this.datePicker){
      var dateNow = moment(this.dateNew).subtract(1, 'days').format('DD/MM/YYYY');
      this.datePicker=false;
    }else{
      var dateNow = moment(this.dateNew , "DD/MM/YYYY").subtract(1, 'days').format('DD/MM/YYYY');
    }
    this.dateNew=dateNow;
    this.slotTimings=[];     
      var obj={"clinicId":this.clinicId,'slotDate':dateNow};          
              this.authService.getSlot(obj).subscribe((data:any) => {
      if(data.success){     
          if(data.data==null||data.data==undefined||data.data.length==0){
            this.authService.presentToast('No Slots');
          }else{
            this.slotTimings=data.data.slotTimings;      
          }     
        }else{
          this.authService.presentToast(data.msg);
        }
      });
  }

  pickkerSelect(){
    this.datePicker=true;
  }


  create(){
    this.router.navigateByUrl('slot')
  }

  goToCancel(item,i){
    this.selectedAppointment={};
    if(item.isBooked){ 
        var obj={"doctorId":this.doctorId};          
        this.authService.getAllDoctorAppointment(obj).subscribe((data:any) => {    
         this.appointmentArray=data.data;
         this.appointmentArray.forEach((element)=>{
          var d = moment(this.dateNew).format('DD/MM/YYYY');
           if(element.appointmentStartTime==item.starttime && element.appointmentDate==this.dateNew){
             this.selectedAppointment=element;
              let navigationExtras = {
              queryParams: {
                special: JSON.stringify(this.selectedAppointment),
              }
              }
              this.router.navigate(['cancel-appointment'], navigationExtras);
           }
         })
  });
}else{
    let navigationExtras = {
      queryParams: {
        special: JSON.stringify(item),
        index:i,
        clinicAddress:this.clinicAddress,
        clinicName:this.clinicName,
        clinicId:this.clinicId,
        selectedDate:this.dateNew,
        slotTimings:JSON.stringify(this.slotTimings)
      }
    };
    this.router.navigate(['create-appointment'], navigationExtras);
}
  }
}