import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public username : string = "asdasd";
  public roles: string[] = [];

  constructor(private auth: AuthService, private usuario: UsuariosService) {}

  ngOnInit() {
    this.usuario.getUsername()
    .subscribe(val=>{
      let usernameFromToken = this.auth.getUsernameFromToken(); 
      this.username = val || usernameFromToken;
    });

    this.usuario.getRoles()
    .subscribe(val=>{
      let rolesFromToken = this.auth.getRolesFromToken(); 
      this.roles = rolesFromToken
    })
  }

  logout() {
    this.auth.signOut();
  }
}
