import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master, UpdateResponse } from '../../services/master.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update implements OnInit {
  updateObj: any = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  };

  changePassword: any = {
    oldPassword: '',
    newPassword: '',
  };

  showModal = false;

  constructor(private masterSrv: Master) {}

  ngOnInit(): void {
    this.updateObj = this.masterSrv.getProfile();
    if (!this.updateObj) {
      console.error('No profile data found');
      return;
    }
  }

  onUpdate() {
    this.masterSrv.updateProfile(this.updateObj).subscribe({
      next: (res: UpdateResponse) => {
        const token = res.token ?? res.data?.token;
        const expiration = res.expiration ?? res.data?.expiration;

        if (!token) {
          console.error('No se recibió token');
          return;
        }
        if (!expiration) {
          console.error('No se recibió expiration');
          return;
        }

        localStorage.setItem('Token', token);
        localStorage.setItem('expiration', expiration);
        console.log('Token guardado:', localStorage.getItem('Token'));
        console.log('Expiration guardada:', localStorage.getItem('expiration'));
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  onChangePassword() {
    this.masterSrv.changePassword(this.changePassword).subscribe({
      next: (res: UpdateResponse) => {
        const token = res.token ?? res.data?.token;
        const expiration = res.expiration ?? res.data?.expiration;

        if (!token) {
          console.error('No se recibió token');
          return;
        }
        if (!expiration) {
          console.error('No se recibió expiration');
          return;
        }

        localStorage.setItem('Token', token);
        localStorage.setItem('expiration', expiration);
        console.log('Token guardado:', localStorage.getItem('Token'));
        console.log('Expiration guardada:', localStorage.getItem('expiration'));
        this.closeModal();
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
