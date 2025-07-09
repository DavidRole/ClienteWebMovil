// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/models/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();
  get items(): CartItem[] { return this.itemsSubject.value; }

  addItem(dishId: number, name: string, qty: number) {

    const quantity = Number(qty);
    if (quantity < 1) {
      return; 
    }

  
    const items = [...this.items];


    const idx = items.findIndex(i => i.dishId === dishId);

    if (idx > -1) {

      items[idx] = {
        ...items[idx],
        quantity: items[idx].quantity + quantity
      };
    } else {

      items.push({ dishId, name, quantity });
    }


    this.itemsSubject.next(items);
  }

  updateQuantity(dishId: number, qty: number) {
    const quantity = Number(qty);
    const items = this.items
      .map(i =>
        i.dishId === dishId
          ? { ...i, quantity }
          : i
      )
 
      .filter(i => i.quantity > 0);

    this.itemsSubject.next(items);
  }

  removeItem(dishId: number) {
    this.itemsSubject.next(
      this.items.filter(i => i.dishId !== dishId)
    );
  }

  clear() {
    this.itemsSubject.next([]);
  }
}
