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
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit {
  itemsList: any[] = [];
  quantities: Record<number, number> = {};
  showModal: Record<number, boolean> = {};

  constructor(
    private masterSrv: Master,
    private cartSrv: CartService
  ) {}

  ngOnInit(): void {
    this.masterSrv.getDishes().subscribe({
      next: (res: any) => {
        // Chequeo de seguridad
        if (res && Array.isArray(res.data)) {
          this.itemsList = res.data;
          // Inicializo cantidades y estado de modal
          this.itemsList.forEach(item => {
            this.quantities[item.id] = 1;
            this.showModal[item.id] = false;
          });
        } else {
          console.error('Formato inesperado de datos:', res);
          this.itemsList = [];
        }
      },
      error: err => console.error('Error al cargar platos', err)
    });
  }

  add(id: number, name: string) {
    const qty = this.quantities[id] || 1;
    this.cartSrv.addItem(id, name, qty);
    this.quantities[id] = 1;
  }

  openModal(id: number) {
    this.add(id, this.itemsList.find(i => i.id === id)?.name || '');
    this.showModal[id] = true;
  }

  closeModal(id: number) {
    this.showModal[id] = false;
  }
}
