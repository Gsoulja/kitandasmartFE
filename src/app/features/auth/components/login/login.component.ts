import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthServiceService} from '../../services/auth-service.service';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
   MatCardModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  emailSent: boolean = false;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthServiceService) {}

  onSubmit() {
    if (!this.email) {
      this.errorMessage = 'Please enter an email address';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.authService.sendMagicToken(this.email).subscribe({
      next: (response) => {
        this.emailSent = true;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error || 'Failed to send login link. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
