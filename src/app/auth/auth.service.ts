import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router} from "@angular/router";
import { Subject } from "rxjs";
import {AuthData} from './auth-data.model';
import { environment } from "../../environments/environment";

const BACKEND_URL=environment.apiUrl+"/auth/";

@Injectable({providedIn:'root'})
export class AuthService{
  private token;
  private isAuthenticated=false;
  private authStatusListener=new Subject<boolean>();
  private tokenTimer:NodeJS.Timer;
  private authId:string;
  constructor(private http:HttpClient,private router:Router){

  }
  getToken(){
    return this.token;
  }
  getAuthId(){
    return this.authId;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  createUser(email:string,password:string){
    const authData:AuthData={email:email,password:password};
    this.http
    .post(BACKEND_URL+"/signup",authData).
    subscribe((response)=>{
      this.router.navigate(['/']);
    },error=>{
      this.authStatusListener.next(false);
    });

  }
  login(email:string,password:string){
    const authData:AuthData={email:email,password:password};
    this.http
    .post<{token:string,expiresIn:number,authId:string}>(BACKEND_URL+'/login',authData)
    .subscribe(response=>{
      const token=response.token;
      this.token=token;
      if(token){
        const expiresInDuration=response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated=true;
        this.authId=response.authId;
        this.authStatusListener.next(true);
        const now=new Date();
        const expirationDate=new Date(now.getTime()+expiresInDuration*1000);
        console.log(expirationDate);
        this.saveAuthData(token,expirationDate, this.authId)
        this.router.navigate(['/']);
      }
    },error=>{
      this.authStatusListener.next(false);
    })
  }
  autoAuthUser(){
    const authInformation=this.getAuthData()
    if(!authInformation){
      return;
    }
    const now=new Date();
    const expiresIn=authInformation.expirationDate.getTime()-now.getTime();
    if(expiresIn>0){
      this.token=authInformation.token;
      this.isAuthenticated=true;
      this.authId=authInformation.authId;
      this.setAuthTimer(expiresIn/1000)
      this.authStatusListener.next(true);
    }
  }
  logout(){
    this.token=null;
    this.isAuthenticated=false;
    this.authStatusListener.next(false)
    this.authId=null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  private setAuthTimer(duration:number){
    console.log("setting timer:"+duration)
    this.tokenTimer= setTimeout(()=>{
      this.logout();
    },duration*1000)
  }
  private saveAuthData(token:string,expirationData:Date,authId:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationData.toISOString());
    localStorage.setItem('authId',authId)
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('authId');
  }
  private getAuthData(){
    const token=localStorage.getItem('token');
    const expirationDate=localStorage.getItem('expiration');
    const authId=localStorage.getItem('authId');
    if(!token || !expirationDate)
      {
        return null;
      }
    return {
      token:token,
      expirationDate:new Date(expirationDate),
      authId:authId
    }
  }
}
