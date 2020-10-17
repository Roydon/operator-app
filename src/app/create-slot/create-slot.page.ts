import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.page.html',
  styleUrls: ['./create-slot.page.scss'],
})
export class CreateSlotPage implements OnInit {

  slotInterval;
  selectDate;
  FinalSlotArray=[];
  doctorId;
  clinicArray=[];
  clinicName:any;
  selectedClinic:any={};
  newIndex;
  clinicId;
  slot:boolean=false;
  startDate;
  endDate;
  slotCreatedBoolean:boolean=false;
  slotTimings=[];
  currentSelected;
  previousIndex;

timeSelected:boolean=false;

  constructor(private menu: MenuController,public router: Router,public route: ActivatedRoute,public storage: Storage,
    public httpClient: HttpClient, public authService: AuthService) { 
      this.route.queryParams.subscribe(params => {
        if (params && params.special && params.startDate) {
          var details = JSON.parse(params.special);
          this.selectedClinic=details;
          this.clinicId=details._id
            this.startDate=moment(params.startDate).format('DD/MM/YYYY');
            this.endDate=this.selectedClinic.date;
            this.slotCreatedBoolean=true;
        }else{
          var details = JSON.parse(params.special);
          this.selectedClinic=details;
          this.clinicId=details._id
        }
      });
  }

  ngOnInit() {
    
    this.storage.get('user').then((res)=>{
      this.doctorId=res._id;
      var selectedDate = moment(this.selectDate).format('DD/MM/YYYY')
        var obj={"clinicId":this.clinicId,'slotDate':selectedDate};          
         this.authService.getSlot(obj).subscribe((data:any) => {
    });
  });
  }

 segment(ev,index) {
    this.slot=false;
    this.newIndex = index;
    this.clinicArray=[];
    this.FinalSlotArray=[];
 this.storage.get('clinicArray').then((clinics)=>{
   this.clinicArray=clinics;
   this.selectedClinic=this.clinicArray[this.newIndex];
   this.clinicName=this.clinicArray[this.newIndex].clinicName;
   this.selectedClinic.slots.forEach((element)=>{
     if(element.isConfirmed){
     
       
       if(moment(this.selectDate).format("DD-MM-YYYY")===moment(element.date).format("DD-MM-YYYY")){
         while(moment(element.startTimeFinal)<=moment(element.endTimeFinal)){
                       var slotobjFinal={};
                       var endTime =  moment(element.startTimeFinal).add(element.interval, 'm');
                       slotobjFinal={"starttime":moment(element.startTimeFinal).format('HH:mm A'),'endTime':endTime,'isBooked':element.isBooked,'date':moment(element.date).format('DD MMM YYYY')};
                       this.FinalSlotArray.push(slotobjFinal);        
                       element.startTimeFinal=  moment(element.startTimeFinal).add(element.interval,'minutes');
                     }

       }else{
       }
     }
    
     
   });
 });
    this.slot=true;
  }


  dateChange(){
    this.slotTimings=[];
    var selectedDate = moment(this.selectDate).format('DD/MM/YYYY')
      var obj={"clinicId":this.clinicId,'slotDate':selectedDate};          
      this.authService.getSlot(obj).subscribe((data:any) => {
      this.slotTimings=data.data.slotTimings;
  });
 
  }

  createAppointment(item){
    let navigationExtras = {
      queryParams: {
        special: JSON.stringify(item),
        clinic:JSON.stringify(this.selectedClinic),
        selectedDate:this.selectDate,
        slotTimings:JSON.stringify(this.slotTimings)
      }
    };
    this.router.navigate(['create-appointment'], navigationExtras);
  }

  goToAppointment(){
    this.router.navigateByUrl('tabs/tab1');
  }

  create(){
    this.router.navigateByUrl('select-clinic');
  }

  back() {
    this.router.navigateByUrl('tabs/tab1');   
  }

  slotSelection(i){
    if(this.timeSelected==true){
      this.slotTimings[this.previousIndex].isBooked=false;
      this.previousIndex=i;
      this.slotTimings[i].isBooked=true;
    }else{
      this.currentSelected=i;
      this.timeSelected=true;
      this.previousIndex=i;
      this.slotTimings[i].isBooked=true;
  
    }
    
  }

}
