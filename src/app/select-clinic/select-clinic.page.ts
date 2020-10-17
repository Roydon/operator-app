import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-select-clinic',
  templateUrl: './select-clinic.page.html',
  styleUrls: ['./select-clinic.page.scss'],
})
export class SelectClinicPage implements OnInit {
  doctorId: any;
  clinicArray=[];
  doctorName: any;
  doctorMobile:any;
  clinicName:any;
  selectedClinic=[];
  activeSlot=[];
  selectDate=moment().format('DD MMM YYYY');
  slot:boolean=false;
  createSlotBoolean:boolean;

  constructor(public storage: Storage,public httpClient: HttpClient,public router: Router,
    public route:ActivatedRoute, public authService: AuthService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        var details =params.special;
        if(details=="Clinic"){
          this.createSlotBoolean=true;
        }else {
          this.createSlotBoolean=false;
        }
      }
    });
    
   }
  
  ngOnInit() {
    this.slot=false;
    this.storage.get('user').then((res)=>{
      this.doctorId=res._id;
      this.doctorMobile=res.doctorMobile;
      this.doctorName=res.doctorName;   
        var obj={"doctorId":this.doctorId};          
         this.authService.getAllClinic(obj).subscribe((data:any) => {
        if(data.success==true){
          this.clinicArray=data.data;
          this.clinicName=this.clinicArray[0].clinicName;        
          this.clinicArray.forEach((element)=>{
            if(this.clinicName==element.clinicName){
              this.selectedClinic=element.slots;
              this.selectedClinic.forEach((element)=>{
                if(this.selectDate==element.date){
                  this.activeSlot.push(element);
                  this.slot=true;
                }
              })
            }
          })
        }
      });
    })
  }



  
  clinic(item){
    if(this.createSlotBoolean){
    let navigationExtras = {
      queryParams: {
        special: JSON.stringify(item)
      }
    };
    this.router.navigate(['slot'], navigationExtras);
    }else{   
    let navigationExtras = {
      queryParams: {
        special: JSON.stringify(item)
      }
    };
    this.router.navigate(['create-slot'], navigationExtras);
    }
     
    
  }

  dateChange(){
    this.slot=false;
    this.activeSlot=[];
    var selectedDate=moment(this.selectDate).format('DD MMM YYYY')
    this.selectedClinic.forEach(element => {
      if(element.date == selectedDate){ 
       this.activeSlot.push(element);
       this.slot=true;
      }else{     
      }
    }); 
  }

  segment(ev: any) {
    this.clinicName='';
    this.selectedClinic=[];
    this.activeSlot=[];
    this.slot=false;
    var selectedDate=moment(this.selectDate).format('DD MMM YYYY')
    this.clinicName=ev.detail.value;
    this.clinicArray.forEach((element)=>{
      if(this.clinicName==element.clinicName){
        this.selectedClinic=element.slots;
        this.selectedClinic.forEach((element)=>{
          if(this.selectDate==element.date){
            this.activeSlot.push(element);
            this.slot=true;
          }
        })
      }
    })
  }



  back() {
    this.router.navigateByUrl('tabs/tab2');   
  }

}
