import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "http://159.65.96.86:8080/services/auth/";
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodeToken();
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}signin`, loginObj);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getUsernameFromToken() {
    if(this.userPayload){
      console.log(this.userPayload.sub);
      return this.userPayload.sub;
    }
  }

  getRolesFromToken() {
    if(this.userPayload){
      console.log(this.userPayload.roles);
      return this.userPayload.roles;
    }
  }
}
