import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateForm } from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(
    private fb : FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast:NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if(this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.loginForm.reset();
          console.info(res.accessToken)
          this.auth.storeToken(res.accessToken);
          this.toast.info({detail: "Nada planificado para hoy.", duration:5000});
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          this.toast.error({detail: "ERROR", summary:"Usuario o Contraseña incorrecto.", duration:5000});   
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm)
      this.toast.error({detail: "ERROR", summary:"Ingrese un Usuario o Contraseña primero.", duration:5000});
    }
  }
}
