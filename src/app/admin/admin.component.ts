
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orders: any[] = []; // Initialize orders array

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (orders: any[]) => {
        this.orders = orders;
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}

