import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  Email:string;
  Password:string;
  isRemeberMe:boolean

   showPassword: boolean = false;

  

  constructor(){}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
