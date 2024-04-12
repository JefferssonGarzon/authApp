import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPattern } from '../../validators/validators-pattern';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authServive = inject(AuthService);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    email: ['jeff@gmail.com', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  login() {
    const { email, password } = this.loginForm.value;
    this.authServive.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),

        error: (message: string) => {
          Swal.fire('Error', message, 'error');
        }
      });
  }
}
