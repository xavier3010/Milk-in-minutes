// manage-product.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  products: any[] = [];
  editForm: FormGroup;
  editingProductId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.fb.group({
      productname: ['', Validators.required],
      productprice: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
      altText: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any>('http://localhost:3000/products')
      .subscribe(products => {
        this.products = products;
      });
  }
  

  resetEditForm() {
    this.editingProductId = null;
    this.editForm.reset();
  }

  deleteProduct(productId: string) {
    this.http.delete<any>('http://localhost:3000/products/' + productId)
      .subscribe(() => {
        this.snackBar.open('Product deleted successfully!', 'Close', {
          duration: 3000
        });
        this.fetchProducts(); // Refresh product list after deletion
      }, error => {
        console.error('Error deleting product:', error);
      });
  }
}
