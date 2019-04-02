import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    console.log('auth gard');
    const returnUrl = state.url;
    // not logged in so redirect to login page
    this.auth.removeAccount();
    this.router.navigate(['/auth/login'], { queryParams: { login: '1', url: returnUrl} });
    // this.router.navigate(["/index"]);
    // this.openLogin('', returnUrl);

    // console.log('returnUrl: ' + returnUrl);
    return false;
  }
}
