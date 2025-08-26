import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

   const spinnerService=inject(SpinnerService)

    spinnerService.spinnerShow();

  return next(req).pipe(
    finalize(()=>{
        spinnerService.spinnerHide();
    })
  );


};
