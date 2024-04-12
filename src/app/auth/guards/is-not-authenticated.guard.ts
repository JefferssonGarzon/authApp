import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../enums/auth-status.enums';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authServive = inject(AuthService);
  const router = inject(Router);

  if (authServive.authStatus() === AuthStatus.noAuthenticated) return true;

  router.navigateByUrl('/dashboard');
  return false;
};
