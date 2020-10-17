import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    GooglePlus,FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
