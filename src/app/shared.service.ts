import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private username: string = '';
  private orders: any[] = [];

  constructor() { }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  storeOrder(order: any) {
    this.orders.push(order);
    // You can implement further logic such as saving orders to a database here
  }

  getOrders(): any[] {
    return this.orders;
  }
}
