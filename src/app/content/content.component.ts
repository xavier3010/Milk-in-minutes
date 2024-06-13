
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CartService } from '../cart.service';

interface Product {
  id: number;
  productname: string;
  productprice: number;
  imageUrl: string;
  altText: string;
  addedToCart: boolean;
  quantity: number;
  category: string[];
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  products: Product[] = [];
  selectedCategory: string = 'all'; // Default category
  searchTerm: string = ''; // Search term

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchProducts(this.selectedCategory);
  }

  fetchProducts(category: string) {
    axios.get('http://localhost:3000/products')
      .then(response => {
        const allProducts: Product[] = response.data;
        if (category === 'all') {
          this.products = allProducts;
        } else {
          this.products = allProducts.filter(product => product.category.includes(category));
        }
        this.products = this.products.map(product => ({ ...product, addedToCart: false, quantity: 1 }));
        this.filterBySearch(); // Apply search filter after fetching products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  addToCart(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.cartService.addToCart({ ...product, quantity: 1 });
      product.addedToCart = true;
    }
  }
  

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.fetchProducts(category);
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterBySearch();
  }

  private filterBySearch() {
    if (!this.searchTerm) {
      return; // If search term is empty, do not filter
    }
    this.products = this.products.filter(product => product.productname.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  placeOrder() {
    // Place order logic here
    // Assuming the order is successfully placed
    this.cartService.clearCart(); // Clear the cart after placing the order
  }
}

