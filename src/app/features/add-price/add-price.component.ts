import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-price',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    FormsModule
  ],
  templateUrl: './add-price.component.html',
  styleUrl: './add-price.component.scss'
})
export class AddPriceComponent {
  name: string = '';
  price: number = 0;

  onSubmit() {
    // Handle form submission
    console.log('Name:', this.name, 'Price:', this.price);
  }
}
