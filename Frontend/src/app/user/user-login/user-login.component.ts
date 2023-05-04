import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(
    private _authService: AuthService, 
    private _alertify: AlertifyService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  onLogin(_form:any){
    console.log(_form.value)
    const token = this._authService.authUser(_form.value);
    if (token){
      localStorage.setItem('token', token.userName);
      this._alertify.success("Login successful")
      this._router.navigate(['/']);
    } else {
      this._alertify.error("Login not successful")
    }
  }
}
