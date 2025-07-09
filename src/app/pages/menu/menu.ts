import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master.service';
import { CartService } from '../../services/cart-service';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu implements OnInit {
  itemsList: any[] = [];
  quantities: Record<number, number> = {};
  showModal: Record<number, boolean> = {};

  constructor(private masterSrv: Master, private cartSrv: CartService) {}

  ngOnInit(): void {
    this.masterSrv.getDishes().subscribe({
      next: (res: any) => {
        // Detectar si la respuesta es un array directo o viene en res.data
        const dishes: any[] = Array.isArray(res)
          ? res
          : Array.isArray(res.data)
          ? res.data
          : [];

        if (!dishes.length) {
          console.error('There were no dishes available', res);
        }

        this.itemsList = dishes;
        // Inicializar cantidades y showModal
        this.itemsList.forEach((item) => {
          this.quantities[item.id] = 0;
          this.showModal[item.id] = false;
        });
      },
      error: (err) => console.error('Error loading dishes', err),
    });
  }

  add(id: number, name: string) {
    const qty = Number(this.quantities[id]) || 1;
    this.cartSrv.addItem(id, name, qty);
    this.quantities[id] = 1;
  }

  openModal(id: number) {
    this.showModal[id] = true;
  }

  closeModal(id: number) {
    this.showModal[id] = false;
  }
}
