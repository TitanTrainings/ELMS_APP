import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUser = '';

  private readonly TOKEN_KEY = 'jwt_token';

  private apiUrl = environment.apiUrl;

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  public AuthenticateUser(user: User): Observable<any> {

    return this._httpClient.post<any>('http://localhost:5203/api/Login/', user);
  }

  getLoginType(): string {
    if (this.isAuthenticated() && this.getRole() === 'employee') {
      return this.loginUser = 'employee';
    }
    else if (this.isAuthenticated() && this.getRole() === 'manager'){
      return this.loginUser = 'manager';
    }
    else{
      return this.loginUser = '';
    }
  }
  
  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public getRole(): string | null {
    const token = this.getToken();

    const decodedToken = this.decodeJwt(token != null ? token : '')

    return decodedToken.role || null;
  }

  private decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c: any) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this._router.navigate(['/login']);
  }
  
  public getLoggedInUsername(): string | null {
    const token = this.getToken();

    const decodedToken = this.decodeJwt(token != null ? token : '')

    return decodedToken.username || null;
  }

}


