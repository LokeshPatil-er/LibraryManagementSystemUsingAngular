import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './shared/toast.service';
import { AuthService } from './shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LightDarkModeService } from './shared/light-dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LibrarySystemUsingAngular';

  languages = [
    { value: 'en', label: 'English' },
    { value: 'mr', label: 'मराठी' }
  ];

  currentLang:string |null = 'en'; // default

  constructor(
    private router: Router,
    private toast: ToastService,
    public authSevice: AuthService,
    public translate: TranslateService,
    public lightDarkModeService:LightDarkModeService
  ) {
    translate.addLangs(['en', 'mr']);
    translate.setFallbackLang('en');
    this.currentLang = translate.getFallbackLang();
  }

  
 

  switchLang(lang: any) {
    this.translate.use(lang.value);
    this.currentLang = lang.value;
  }

  logOutBtnClick() {
    this.authSevice.logout();
  }
}
