import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authService.isAuthenticated()) {
            const expectedRole = next.data['role'];
            const currentRole = this.authService.getRole();
            if (currentRole && currentRole === expectedRole) {
                return true;
            }
            else {
                this.router.navigate(['/un-authorized']);
                return false;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }
}