import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from './toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const toast=inject(ToastService)

   var token:any;
   
   if(typeof window!='undefined' && localStorage)
   {

     token=localStorage.getItem("AuthToken")
   }

   if(!token)
   {
     router.navigate(['/login'])
     toast.showErrorToast("Session is expired ..please login","Session Expired");
     return false;
   }

  return true;
};
