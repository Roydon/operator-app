import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { Platform, MenuController, AlertController, ModalController } from '@ionic/angular';
import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
import { LoadingController ,ToastController } from '@ionic/angular';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  res:any;
  load: any;
  AUTH_SERVER_ADDRESS:  string  =  'https://staging.doctorsday.app';
authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient, private  storage:  Storage,
    public loadingController: LoadingController, public toastController:ToastController,
   public menuCtrl: MenuController,public alertController: AlertController,public modalController:ModalController,
    private platform:Platform) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }
 
  ifLoggedIn() {
    this.storage.get('user').then((response) => {
      if (response) {
        this.authSubject.next(true);
      }
    });
   }


   addPrescription(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/addPrescription`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  getAllDoctorAppointment(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/getAllDoctorAppointment`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  getSearchTerm(obj1): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/getSearchTerm`, obj1).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  getPrescription(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/getPrescription`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  updatePrescription(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/updatePrescription`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  getSlot(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/getSlot`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  getAllClinic(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/getAllClinic`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  createSlot(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/createSlot`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  cancelAppointment(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/cancelAppointment`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  signupUser(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/signupUser`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  newUserAppointment(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/newUserAppointment`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  updateDoctorProfile(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/updateDoctorProfile`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

  getDoctor(obj): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/getDoctor`, obj).pipe(
      tap(async (res:  AuthResponse ) => {
          this.authSubject.next(true);
      })

    );
  }

   async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/signupDoctor`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.doctor) {
          await this.storage.set('user',res.doctor);
          await this.storage.set("ACCESS_TOKEN", res.token);
          await this.storage.set("user_id", res.doctor.id);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/signupDoctor`, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe(
      tap(async (res: AuthResponse) => {

        if (res.success == true) {

          await this.storage.set('user', res.doctor);
          
           await this.storage.set('ACCESS_TOKEN', res.token);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
   await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("user");
    this.authSubject.next(false);
    return;
  }

  isLoggedIn() {
    this.storage.get('user').then((user) => {
      this.storage.get('ACCESS_TOKEN').then((token) => {
      if (user==null || user == undefined) {
        this.authSubject.next(true);
      }
    });
  });
  }
  isAuthenticated() {
    return this.authSubject.value;
  }


  async loading() {
    this.load = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'dots',
      duration:2000
      
    });
    this.load.present();
  }


  async dismissLoading() {
    this.load.dismiss();
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}
