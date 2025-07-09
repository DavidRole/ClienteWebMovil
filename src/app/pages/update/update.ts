import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './update.html',
  styleUrl: './update.css'
})

export class Update implements OnInit {
  updateObj: any = {
    firstName: '',
    lastName:  '',
    email:     '',
    address:   '',
  };

  changePassword: any = {
    oldPassword: '',
    newPassword: ''
  };

   showModal = false;

  constructor(private masterSrv: Master) {}

  ngOnInit(): void {
    
  }

  onUpdate() {
    
  }

  onChangePassword() {
    
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
