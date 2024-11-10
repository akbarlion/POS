import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const role = localStorage.getItem("_rolePerm");
  const loginStatus = localStorage.getItem('_loginStatus')
  const allowedRole = route.data['roles'] as Array<string>;

  if (loginStatus == 'true') {
    return true;
  }
  else if (!loginStatus) {
    router.navigate(['auth'])
    return false;
  }
  else if (allowedRole && allowedRole.indexOf(role) === -1) {
    router.navigate(['access-denied']);
    return false;
  }
  return true;
};


// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivateChildFn, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class loginGuard {
//   constructor(
//     private router: Router,
//     private auth: AuthService
//   ) { }


//   public isLoggedIn(): boolean {
//     let status: any;
//     if (localStorage.getItem('_loginStatus') == 'true') {
//       status = true;
//     }
//     else {
//       status = false;
//     }
//     return status;
//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if (this.isLoggedIn()) {
//       return true;
//     }
//     this.router.navigate(['auth'])
//     return false;
//   }

//   canActivateChild(
//     childRoute: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     const role = localStorage.getItem('_rolePerm');
//     const allowedRole = childRoute.data['roles'] as Array<string>;

//     if (!this.isLoggedIn()) {
//       this.router.navigate(['auth']);
//       return false;
//     }

//     if (allowedRole && allowedRole.indexOf(role) === -1) {
//       this.router.navigate(['access-denied']);
//       return false;
//     }

//     return true;
//   }

// }