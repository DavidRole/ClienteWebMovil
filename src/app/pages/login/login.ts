// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master, LoginResponse } from '../../services/master.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginObj = {
    username: '',
    password: '',
  };

  constructor(
    private masterSrv: Master,
    private router: Router
  ) {}

  onLogin() {
    this.masterSrv.login(this.loginObj).subscribe({
      next: (res: LoginResponse) => {
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

        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
  }
}
