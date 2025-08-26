import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LightDarkModeService {

  constructor() { }

  private isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  setTheme(isDark: boolean) {
    this.isDark = isDark;
    if (this.isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  getTheme(): boolean {
    return this.isDark;
  }
}
