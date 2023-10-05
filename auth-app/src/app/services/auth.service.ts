import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "http://159.65.96.86:8080/services/auth/";
  constructor(private http: HttpClient, private router: Router) { }

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
}
