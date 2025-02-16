import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  returnUrl: string = '';
  submitted: boolean = false;
  token: string = '';  

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, private _router: Router) {

  }

  getUsername(): string {
    const _username = this.loginForm.get('username')?.value;
    if (_username) {
      return _username;
    }
    return '';
  }

  getPassword(): string {
    const _password = this.loginForm.get('password')?.value;
    if (_password) {
      return _password;
    }
    return '';
  }

  onSubmit() {

    const _user = new User(0, '', '', 0, this.getUsername(), this.getPassword());

    this.authService.AuthenticateUser(_user).subscribe(data =>{
      
      this.authService.saveToken(data.token);
      if(this.authService.getRole() === 'employee')
      {
        this._router.navigateByUrl('/main', { skipLocationChange: true }).then(() => {
          this._router.navigate(['/leave-apply']);
      });
        //this._router.navigate(['/leave-apply']);
      }
      else if(this.authService.getRole() === 'manager')
      {
        this._router.navigateByUrl('/main', { skipLocationChange: true }).then(() => {
          this._router.navigate(['/leave-approval']);
      });
        //this._router.navigate(['/leave-approval']);
      }
      else{        
        this._router.navigate(['/un-authorized']);
      }

    });           
  }

  parseJwt(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    console.log('Decoded JWT Payload:', JSON.parse(jsonPayload));
    return JSON.parse(jsonPayload);

  }  

}
