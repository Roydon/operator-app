import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  addresshide:boolean=false;
  pinhide:boolean=false;
  woman:boolean=false;
  man:boolean=true;
  gender:any;
  address:any;
  userDetails={};
  female:boolean=false;
  male:boolean=false;
  contactNum:any;
  doctorName:any;
  pincode:any;


  constructor(public router: Router,public storage: Storage,public httpClient: HttpClient,public authService: AuthService) { }

  ngOnInit() {
    this.getUser();
    this.storage.get('user').then((user)=>{
      this.address=user.doctorAddress;
      this.pincode=user.doctorPincode;
    });
  }

  radio($event){
    this.gender=$event.detail.value;
    if(this.gender=='M'){
      this.man=true;
      this.woman=false;
    }else if(this.gender='F'){
      this.man=false;
      this.woman=true;
    }
  }

  updateZip(){
    this.pinhide=true;
  }

  cancel1(){
    this.pinhide=false;
  }

  updateAdd(){
    this.addresshide=true;
  }

  cancel(){
    this.addresshide=false;
  }

  updateAddress(){
    this.storage.get('user').then((user)=>{
      var doctorId=user._id; 
      var doctorName=user.doctorName;
      var doctorAddress=this.address;
      var doctorMobile=user.doctorMobile;
      var doctorAdhaarNumber=user.doctorAdhaarNumber;
      var doctorGender=this.gender;
      var doctorPincode=this.pincode;
        var obj={'doctorId':doctorId,'doctorName':doctorName,
        'doctorAddress':doctorAddress,'doctorMobile':doctorMobile,
        'doctorAdhaarNumber':doctorAdhaarNumber,
        'doctorGender':doctorGender,'doctorPincode':doctorPincode};          
         this.authService.updateDoctorProfile(obj).subscribe((data:any) => {
        if(data.success==true){
          this.storage.set('user',data.data);
          this.getUser();
          this.addresshide=false;
          this.pinhide=false;
          this.authService.presentToast('Profile Updated');
        }
     })
    })
  }

  getUser(){
    this.storage.get('user').then((user)=>{
      this.contactNum=user.doctorMobile;
        var obj={'contactNum':this.contactNum};          
         this.authService.getDoctor(obj).subscribe((data:any) => {
      this.userDetails=data.data;
      this.gender=data.data.doctorGender;
      if(this.gender=='M'){
        this.male=true;
        this.female=false;
        this.man=true;
        this.woman=false;
      }else if(this.gender=='F'){
        this.male=false;
        this.female=true;
        this.man=false;
        this.woman=true;
      }else{ 
        this.male=false;
        this.female=false;
        this.man=false;
        this.woman=false;
      }
      });
    })
  }

  back(){
    this.router.navigateByUrl('tabs/tab2');
  }

}
