import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios from 'axios';
import { CartService } from '../cart.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  username: string = '';

  constructor(private cartService: CartService, private router: Router, private sharedService: SharedService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.username = this.sharedService.getUsername();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + parseFloat(item.productprice) * item.quantity, 0);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  placeOrder() {
    // Check if user is signed in
    if (this.username) {
      // Place order with username
      const orderDetails = {
        username: this.username,
        products: this.cartItems
      };

      // Post order details to JSON server
      axios.post('http://localhost:3002/orders', orderDetails)
      .then(response => {
        console.log('Order placed successfully:', response.data);
        // Clear cart items
        this.cartService.clearCart();
        // Show success message using a Snackbar
        this.snackBar.open('Order placed successfully!', 'Close', {
          duration: 3000, // Snackbar duration in milliseconds
          panelClass: ['snackbar-success'] // Custom CSS class for styling
        });
      })
      .catch(error => {
        console.error('Error placing order:', error);
        // Show error message if order placement fails
        this.snackBar.open('Error placing order. Please try again later.', 'Close', {
          duration: 3000, // Snackbar duration in milliseconds
          panelClass: ['snackbar-error'] // Custom CSS class for styling
        });
      });
    } else {
      // Alert user to sign in first
      alert('You did not sign in. Please sign in first.');
      // Redirect to sign in page
      this.router.navigate(['/signin']);
    }
  }
}

