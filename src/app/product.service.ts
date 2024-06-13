import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private apiUrl = 'http://localhost:3000/products'; // Example API URL

  // constructor(private http: HttpClient) { }

  // // Fetch all products from the server
  // getProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // // Add a new product to the server
  // addProduct(productData: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, productData);
  // }

  // // Update an existing product on the server
  // updateProduct(productId: string, productData: any): Observable<any> {
  //   const url = `${this.apiUrl}/${productId}`;
  //   return this.http.put<any>(url, productData);
  // }

  // // Delete a product from the server
  // deleteProduct(productId: string): Observable<any> {
  //   const url = `${this.apiUrl}/${productId}`;
  //   return this.http.delete<any>(url);
  // }
}
