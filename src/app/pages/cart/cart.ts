// src/app/components/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { OrderPayload } from '../../models/models/order-payload';
import { CartItem } from '../../models/models/cart-item';
import { Master } from '../../services/master.service';
import { Auth }       from '../../services/auth';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})

export class Cart implements OnInit {
  items: CartItem[] = [];

  constructor(private cart: CartService, private masterSrv: Master, private auth: Auth, private router: Router) {
  }

  ngOnInit() {
    this.items = this.cart.items;          // Cart is injected by now
    this.cart.items$.subscribe(v => this.items = v);
  }
  
  changeQty(dishId: number, qty: string) {
    const q = parseInt(qty, 10);
    if (q > 0) this.cart.updateQuantity(dishId, q);
  }

  remove(dishId: number) {
    this.cart.removeItem(dishId);
  }

  placeOrder() {
    if (!this.auth.isAuthenticated()) {
      this.auth.ensureLoggedIn();
      console.warn('User not authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }
    const payload: OrderPayload = {
      items: this.items.map(i => ({ dishId: i.dishId, quantity: i.quantity }))
    };
    this.masterSrv.placeOrder(payload).subscribe({
      next: (res: any) => {
        console.log('Order placed successfully', res);
        this.cart.clear();  
      },
      error: (err: any) => {
        console.error('Error placing order', err);
      }
    });
  }
}
