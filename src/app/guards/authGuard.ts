import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{

constructor(private authService: AuthService, private router: Router) { }


canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is authenticated
    if (this.authService.isAuthenticated()) {
      return true;  // User is authenticated, so allow access to the route
    } else {
      // If not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return false;  // Deny access to the route
    }
  }
}