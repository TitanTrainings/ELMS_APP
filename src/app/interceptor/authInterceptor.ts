import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get token from AuthService
        const token = this.authService.getToken();

        // Clone the request and add the Authorization header if token exists
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ${token}'
                }
            });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // Handle the error (for example: token expired, unauthorized)
                if (error.status === 401 || error.status === 403) {
                    // Redirect to login or show error
                    this.router.navigate(['/login']);
                }
                return throwError(error);
            })
        );
    }
}
