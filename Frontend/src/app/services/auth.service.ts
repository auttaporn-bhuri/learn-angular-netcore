import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(_user:User){
    let UserArray = [];
    let u = localStorage.getItem('Users');
    if(u){
      UserArray = JSON.parse(u)
    }

    let user: User = {
      'userName': "name1",
      'email': "name1@mail.com",
      'mobile': 1111111111,
      'password':''
    };
    return user;
    //return UserArray.find(p=> p.userName === _user.userName && p.password === _user.password)
  }
}
