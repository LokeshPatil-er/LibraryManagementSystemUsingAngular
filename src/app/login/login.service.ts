import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string=environment.apiBaseUrl;

  constructor(private httpClient:HttpClient) { }

  LoginVerify(loginCredendial:any)
  {

    let params=new HttpParams()
    .set("Email",loginCredendial.Email)
    .set("Password",loginCredendial.Password)

    return this.httpClient.get(this.baseUrl+"Account/Login",{params})
  }
}
