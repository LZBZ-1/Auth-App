import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private username$ = new BehaviorSubject<string>("");
  private roles$ = new BehaviorSubject<string[]>([]);
  constructor() { }

  public getRoles() {
    return this.roles$.asObservable();
  }

  public setRoles(roles:string[]) {
    this.roles$.next(roles);
  }

  public getUsername() {
    return this.username$.asObservable();
  }

  public setUsername(username: string) {
    this.username$.next(username);
  }

}
