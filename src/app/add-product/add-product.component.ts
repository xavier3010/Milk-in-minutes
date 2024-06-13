// add-product.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: string[] = ['milk', 'yogurt', 'butter', 'cheese']; // Add more categories as needed

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      productname: ['', Validators.required],
      productprice: ['', [Validators.required, Validators.min(0)]], // Ensure product price is not below 0
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
      altText: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      this.http.post<any>('http://localhost:3000/products', newProduct)
        .subscribe(response => {
          // Handle success
          console.log('Product added successfully:', response);
          this.productForm.reset(); // Reset the form after successful submission
          this.showSuccessMessage(); // Display success message
        }, error => {
          // Handle error
          console.error('Error adding product:', error);
        });
    } else {
      this.showErrorMessage(); // Display error message if form is invalid
    }
  }

  showSuccessMessage() {
    this.snackBar.open('Product added successfully!', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }

  showErrorMessage() {
    this.snackBar.open('Please fill out all required fields correctly.', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
}
