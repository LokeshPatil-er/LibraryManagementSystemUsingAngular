import { HttpInterceptorFn } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

 const router=inject(Router)
 const toast=inject(ToastService);

  let token:any;
  if(typeof window !== 'undefined' && localStorage)
    {
       token=localStorage.getItem('AuthToken')
    }
  
  console.log(token);
  const modifiedClone=req.clone({setHeaders:{
          Authorization:`Bearer ${token}`}
  });
  console.log(modifiedClone)
  return next(modifiedClone).pipe(
    catchError((error)=>{
      if(error.status===401)
      {
       toast.showErrorToast("Unauthorized ","Access Error")
        router.navigate(['/login']);
      }else if(error.status===400)
      {
        toast.showErrorToast("User credential is wrong..check it and try again","Login Failed")
      }
      else if(error.status===404)
      {
        toast.showErrorToast("User is not found..","Not Found")
      }
      else if(error.status===500)
        {
          toast.showErrorToast("Internal server issue ..try again after sometime..","Internal server Error")
        }
     

      return throwError(() => error);
    })
  )
};
