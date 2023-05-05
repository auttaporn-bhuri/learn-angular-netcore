import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedInUser?: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  loggedIn(){
    this.loggedInUser = localStorage.getItem('token')?.toString();
    return this.loggedInUser;
  }

  onLogout(){
    localStorage.removeItem('token');
  }
}
