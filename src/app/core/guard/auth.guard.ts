import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../features/auth/services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService); // Inject the AuthServiceService
  const router = inject(Router); // Inject the Router instance

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']); // Redirect to login
    return false;
  }
};
