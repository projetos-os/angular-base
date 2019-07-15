import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import {User} from '../model/user'
import {AppSettings} from '../config/app.settings'



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  

  getUsuarios(): Observable<any>{
    let usrs = this.http.get<any>(AppSettings.APP_URL+'/users/');    
    return usrs;
  }

  getById(idUser:number): Observable<any>{
    let usrs = this.http.get<any>(AppSettings.APP_URL+'/users/'+idUser);    
    return usrs;
  }

  create(user:User): Observable<any>{
    let usrs = this.http.post<any>(AppSettings.APP_URL+'/users/',user);    
    return usrs;
  }

  update(user:User): Observable<any>{
    let usrs = this.http.put<any>(AppSettings.APP_URL+'/users/'+user.idUser,user);    
    return usrs;
  }

  del(id): Observable<any>{
    let usrs = this.http.delete<any>(AppSettings.APP_URL+'/users/'+id);    
    return usrs;
  }

  login(email:string,senha:string): Observable<any>{
    let param = new FormData();
    param.append('grant_type','password');
    param.append('username',email);
    param.append('password',senha);
    

    let usrs = this.http.post<any>(AppSettings.APP_URL+'/oauth/token',param);    
    return usrs;
  }

}
