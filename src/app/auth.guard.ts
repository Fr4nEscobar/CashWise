import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginVerificationService } from './login-verification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginVerification: LoginVerificationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.loginVerification.verLogin()) {
      // El usuario está autenticado, permite el acceso a la ruta
      return true;
    } else {
      // El usuario no está autenticado, redirige a la ruta de inicio de sesión
      this.router.navigate(['']);
      return false;
    }
  }
}