import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatError,
    MatLabel,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton
  ]
})
export class AuthModule { }
