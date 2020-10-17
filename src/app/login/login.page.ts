import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  userData:any={};
  token;

  constructor(public storage: Storage,public router: Router,private authService: AuthService,
    private googlePlus: GooglePlus,private fcm: FCM) { }

  ngOnInit() {
    this.fcm.getToken().then(token => {
      this.token=token;
     });
  }

  login(){
    var obj={emailId:this.email,password:this.password,token:this.token}
    this.authService.login(obj).subscribe((res) => {
      if(res.success == false){
        alert("Invalid Parameters");
      }else{
        this.storage.set("ACCESS_TOKEN", res.token);
        this.storage.set("user", res.doctor);
        this.router.navigateByUrl('tabs/tab1');
      }
    });
  }
}
