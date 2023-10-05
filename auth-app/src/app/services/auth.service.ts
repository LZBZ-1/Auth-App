import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "http://159.65.96.86:8080/services/auth/";
  constructor(private http: HttpClient) { }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}signin`, loginObj);
  }
}
