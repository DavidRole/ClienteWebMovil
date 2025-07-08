// src/app/pages/menu/menu.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Master } from '../../services/master.service';
import { CartService } from '../../services/cart-service';

@Component({
  standalone: true,          
  selector: 'app-menu',
  imports: [ CommonModule, FormsModule, RouterLink ], 
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']  
})
export class Menu implements OnInit {
  @Input() dishes: { id: number; name: string }[] = [];
  quantities: Record<number, number> = {};
  itemsList: any[] = [];

  
  constructor(private masterSrv: Master, private cartSrv:CartService) { }

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void{
    
    this.masterSrv.getDishes().subscribe((res: any) => {
      this.itemsList = res.data;
    })
  }

  add(id: number, name: string) {
    const qty = this.quantities[id] || 1;
    this.cartSrv.addItem(id, name, qty);
    this.quantities[id] = 1;
  }
}
