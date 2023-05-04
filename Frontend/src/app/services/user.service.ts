import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(_user:User){
    let users; 
    // Append data to array
    if (localStorage.getItem('Users')){
      let data: any = localStorage.getItem('Users');
      users = JSON.parse(data);        
      users = [_user, ... users];         
    } else{
      users = [_user];
    }
    // Save array data to Local Storage
    localStorage.setItem('Users', JSON.stringify(_user));
  }
}
