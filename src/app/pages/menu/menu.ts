import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master.service';
import { CartService } from '../../services/cart-service';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit {
  @Input() dishes: { id: number; name: string }[] = [];
  itemsList: any[] = [];
  quantities: Record<number, number> = {};
  showModal: Record<number, boolean> = {};

  constructor(
    private masterSrv: Master,
    private cartSrv: CartService
  ) {}

  ngOnInit(): void {
    this.masterSrv.getDishes().subscribe((res: any) => {
      this.itemsList = res.data;
      // inicializar estado por cada plato
      this.itemsList.forEach(item => {
        this.quantities[item.id] = 1;
        this.showModal[item.id] = false;
      });
    });
  }

  add(id: number, name: string) {
    const qty = this.quantities[id] || 1;
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
