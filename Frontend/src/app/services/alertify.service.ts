import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(_msg: string){
    return alertify.success(_msg);
  }

  warning(_msg: string){
    return alertify.warning(_msg);
  }

  error(_msg: string){
    return alertify.error(_msg);
  }
  
}
