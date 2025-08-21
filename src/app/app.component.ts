import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './shared/toast.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LibrarySystemUsingAngular';


  constructor(private router:Router,
              private toast:ToastService,
              public authSevice:AuthService
  ){}

  

  logOutBtnClick()
  {
    
     this.authSevice.logout()
    
  }
}
