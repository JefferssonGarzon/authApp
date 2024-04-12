import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPattern, firstNameAndLastnamePattern } from '../../validators/validators-pattern';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    name: ['', [Validators.required, Validators.pattern(firstNameAndLastnamePattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],

  })

  register() {
    const body = this.registerForm.value;

    this.authService.register(body)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message: string) => {
          Swal.fire('Error', message, 'error');
        }
      })
  }
}
