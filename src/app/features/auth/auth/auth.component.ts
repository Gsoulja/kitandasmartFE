import {Component, signal} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: false,
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
 emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  errorMessage = signal('');

  constructor() {
    merge(this.emailForm.statusChanges, this.emailForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.emailForm.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.emailForm.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
  getErrorMessage() {
    if (this.emailForm.get('email')?.hasError('required')) {
      return 'Email is required';
    } else if (this.emailForm.get('email')?.hasError('email')) {
      return 'Invalid email format';
    } else {
      return '';
    }
  }
  onSubmit() {
    if (this.emailForm.valid) {
      // Implement email submission logic
      console.log('Email submitted:', this.emailForm.value);
    }
    else
    {
      console.log('Error ',this.emailForm.value)
    }
  }
}
