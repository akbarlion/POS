import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const role = localStorage.getItem("_rolePerm")
  const allowedRole = route.data['roles'] as Array<string>;

  if (allowedRole && allowedRole.indexOf(role) === -1) {
    router.navigate(['access-denied'])
    return false;
  }
  return true;
};
