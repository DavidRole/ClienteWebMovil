// src/app/pages/update/update.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule }        from '@angular/forms';
import { CommonModule }       from '@angular/common';
import { Router }             from '@angular/router';

import { Master, UpdateResponse } from '../../services/master.service';
import { Auth }            from '../../services/auth';

@Component({
  standalone:  true,
  selector:    'app-update',
  imports:     [ FormsModule, CommonModule ],
  templateUrl: './update.html',
  styleUrls:   ['./update.css'],
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
    newPassword: '',
  };
  showModal = false;

  constructor(
    private masterSrv: Master,
    private auth:      Auth,
    private router:    Router
  ) {}

  ngOnInit(): void {
    // 1) Protege el acceso
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // 2) Obtiene el perfil del servidor
    this.masterSrv.getProfile().subscribe({
      next: (profile: any) => {
        this.updateObj = profile;
      },
      error: (err: any) => {
        console.error('Error cargando perfil', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  onUpdate(): void {
    this.masterSrv.updateProfile(this.updateObj).subscribe({
      next: (res: UpdateResponse) => {
        const { token, expiration } = res;
        if (!token || !expiration) {
          console.error('No se recibió token o expiration');
          return;
        }
        localStorage.setItem('token',      token);
        localStorage.setItem('expiration', expiration);
        console.log('Perfil y token actualizados');
      },
      error: (err) => console.error('Error actualizando perfil', err)
    });
  }

  onChangePassword(): void {
    this.masterSrv.changePassword(this.changePassword).subscribe({
      next: (res: UpdateResponse) => {
        const { token, expiration } = res;
        if (!token || !expiration) {
          console.error('No se recibió token o expiration');
          return;
        }
        localStorage.setItem('token',      token);
        localStorage.setItem('expiration', expiration);
        this.closeModal();
        console.log('Contraseña y token actualizados');
      },
      error: (err) => console.error('Error cambiando contraseña', err)
    });
  }

  logOut(): void {
    this.auth.logout();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
