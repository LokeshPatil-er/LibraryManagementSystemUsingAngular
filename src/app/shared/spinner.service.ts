import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerService:NgxSpinnerService) { }

  spinnerShow()
  {
    this.spinnerService.show();
  }

  spinnerHide(){

    setTimeout(()=>{
      this.spinnerService.hide();
    },2000)
    
  }
}
