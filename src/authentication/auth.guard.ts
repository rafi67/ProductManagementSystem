import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


  export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean => {   
    const authService = inject(AuthService);
    const router = inject(Router);
    if(authService.isLogin()) return true;
    router.navigate(['/Login']);
    return false;
  };

  export const authGuard2: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean => {   
    const authService = inject(AuthService);
    const router = inject(Router);
    if(authService.isLogin()) 
      return false;
    
    return true;
  };

  export const authGuard3: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean => {   
    const authService = inject(AuthService);
    const router = inject(Router);
    if(authService.isLogin() && authService.isAdmin()) 
      return true;
    
    return false;
  };