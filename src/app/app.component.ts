import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/enums/auth-status.enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authApp';
  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        const url = localStorage.getItem('url') ?? '/dashboard';
        this.router.navigateByUrl(url);
        return;

      case AuthStatus.noAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

      default:
        return;
    }

  })
}
