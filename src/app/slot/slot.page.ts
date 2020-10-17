import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.page.html',
  styleUrls: ['./slot.page.scss'],
})
export class SlotPage implements OnInit {
  slotInterval: any;

  date;
  startTime;
  endTime;
  dob: any;
  mobile: any;
  time:any;
  clinicId:any;
  doctorId:any;
  slotArray=[];
  selectDate=moment().format('DD MMM YYYY');
  selectedSlotArray=[];
  slotsArr=[];
  selectedClinic={};
  days={};
  newArray:any=[];
  slotSelected:boolean=false;
  FinalSlotArray=[];
  confirmedDays:any={};
 

  constructor(private menu: MenuController,public storage: Storage,
    public httpClient: HttpClient,public route: ActivatedRoute,
    public toastController: ToastController,public router: Router, 
    public authService:AuthService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        var details = JSON.parse(params.special);
        this.selectedClinic=details;
        this.clinicId=details._id;
      }
    });
   }

  ngOnInit() {

  
  }

  radio($event){
    this.slotInterval=$event.detail.value;
  }



  selectedDate(d){

    if(d==this.selectDate){
      this.presentToast('Select Future Date');
    }else{
      this.newArray=[];
      this.presentToast('Select Days you will be available at clinic in this week');
      var date=moment(d);
     
    for(var i=0;i<=6;i++){
      var slotObj={'date':date.format('DD/MM/YYYY'),
      'day':moment(date).format('DD/MM/YYYY'),
      'clinicId':this.clinicId,
      'isConfirmed':false}
      var dateNew=moment(date).add(i,'days').format('DD/MM/YYYY');
      var dayNew = moment(date).add(i,'days').format('dddd');
      var slotObj={
        'date':dateNew,
          'day':dayNew,
          'clinicId':this.clinicId,
          'isConfirmed':false
      }
this.newArray.push(slotObj);
    }
     
     
    }
  
  }

generateSlot($event){

  this.FinalSlotArray=[];
  this.slotInterval=$event.detail.value;
  
  var interval=parseInt(this.slotInterval);
  var start = moment(this.startTime);
  var end = moment(this.endTime);
 var difference = moment(start).diff(end,'minutes');
  while(difference!=0){
    if(start==end){
      break;
    }else{
      var slotobjFinal={};
    var endT =  moment(start).add(interval, 'minutes');
    slotobjFinal={"starttime":moment(start).format('HH:mm A'),'endTime':moment(endT).format('HH:mm A'),
    'isBooked':false,'date':moment(this.date)};
     this.FinalSlotArray.push(slotobjFinal);
     
     start=  moment(start).add(interval,'minutes');
     var difference = moment(start).diff(end,'minutes');
    }
  }
  this.slotSelected=true;

  
}




confirm(){

  this.newArray.forEach(element => {
    if(element.isConfirmed){
      element.slotTimings=this.FinalSlotArray;
      this.selectedSlotArray.push(element)
    }
  });
 
var slot = JSON.stringify(this.selectedSlotArray);  
  this.storage.get('user').then((user)=>{
    this.doctorId=user._id;
      var obj={"doctorId":this.doctorId,'slotDetails':slot};          
      this.authService.createSlot(obj).subscribe((data:any) => {
      if(data.success==true){
        var clinicData=data.data
        let navigationExtras ={
          queryParams: {
            special: JSON.stringify(clinicData),
            startDate: this.date
          }
        };   
        this.router.navigate(['create-slot'], navigationExtras);      
      }else{
        this.presentToast('Check Internet Connection');
      }
    }); 
  })
}

checkbox($event){
this.newArray.forEach(element => {
  if($event.detail.value==element.day){
    if(element.isConfirmed){
      element.isConfirmed=false;
    }else{
      element.isConfirmed=true;
      
    }
  }
});
}




    
  back() {
    this.router.navigateByUrl('tabs/tab1');   
  }

  async presentToast(msg){
    const toast = await this.toastController.create({
      message:msg,
      duration:2000
    });
    toast.present();
  }


}
