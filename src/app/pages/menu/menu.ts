// src/app/pages/menu/menu.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';     
import { HttpClient } from '@angular/common/http';   
import { Master }            from '../../services/master.service';

@Component({
  standalone: true,          
  selector: 'app-menu',
  imports: [ CommonModule ], 
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']  
})
export class Menu implements OnInit {
  itemsList: any[] = [];

  // ③ firma correcta con paréntesis
  constructor(private masterSrv: Master) { }

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void{
    
    this.masterSrv.getDishes().subscribe((res: any) => {
      this.itemsList = res.data;
    })
  }
}
