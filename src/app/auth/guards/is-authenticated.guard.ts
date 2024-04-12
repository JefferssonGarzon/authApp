import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enums/auth-status.enums';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authServive = inject(AuthService);
  const router = inject(Router);
  const url = state.url;
  localStorage.setItem('url', url);

  if (authServive.authStatus() === AuthStatus.authenticated) return true;

  router.navigateByUrl('/auth/login');
  return false;
};
