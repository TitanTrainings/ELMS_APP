import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  title = 'Employee Leave Management System';
  show = false;
  isAuthenticated = false;

  constructor(public authService: AuthService, private _router: Router) {

  }

  ngOnInit(): void {
    
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true;
      if (this.authService.getRole() === 'employee') {
        this.show = true;
      }
      else if (this.authService.getRole() === 'manager') {
        this.show = false;
      }
    }
    else {
      this.isAuthenticated = false;
    }
  }

  logout(): void {    
    this.authService.logout();
  }
}
