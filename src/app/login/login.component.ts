import { Component } from '@angular/core';
import { ToastService } from '../shared/toast.service';
import { SpinnerService } from '../shared/spinner.service';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { TranslateService } from '@ngx-translate/core';


export interface Users {
  Email: string;
  Password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 
loginCredential: Users = {
  Email: '',
  Password: ''
};

  showPassword: boolean = false;
  loginAttemt:number=3;
  timeRemainingToLogin:number=5;
  timer: any;

  constructor(private toast:ToastService,
              private spinner:SpinnerService,
              private loginService:LoginService,
              private router:Router,
              private authService:AuthService,
              public translate:TranslateService
  ){}

  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin(loginForm:NgForm){

    if(loginForm.invalid)
    {
      this.toast.showErrorToast("Fill Email and Password correctly.",'Validation Error')
      return;
    }

    this.loginService.LoginVerify(this.loginCredential).subscribe((response:any)=>{
      console.log(response)
     
       this.authService.setAuthData(response.jwtToken,response.UserId);
         
        this.router.navigate(['/BooksList'])
        this.toast.showSuccessToast(`Welcome back ${response.Name}`,"Login Success")
    })

    this.loginAttemt--;
    console.log(this.loginCredential)

    if (this.loginAttemt === 0) {
      this.startLockoutTimer();
    }
  }

  startLockoutTimer() {
    this.timer = setInterval(() => {
      this.timeRemainingToLogin--;
      if (this.timeRemainingToLogin <= 0) {
        clearInterval(this.timer);
        this.loginAttemt = 3; 
      }
    }, 1000);
  }
}
