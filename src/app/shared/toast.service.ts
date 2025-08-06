import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService:ToastrService) { }

  showSuccessToast(message:string,title:string){
    this.toastrService.success(message,title)
  }

  showErrorToast(message:string,title:string){
    this.toastrService.error(message,title)
  }

  showWarningToast(message:string,title:string){
    this.toastrService.warning(message,title)
  }

  showInfoToast(message:string,title:string){
    this.toastrService.info(message,title)
  }
}
