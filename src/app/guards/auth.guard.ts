import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userExits = this.authSrv.getDataUser();
    console.log('usuario en la consola', this.authSrv.getDataUser());
    if (userExits) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
