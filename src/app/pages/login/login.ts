// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master, LoginResponse } from '../../services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
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
    private router: Router,
  ) {}

  onLogin() {
    this.masterSrv.login(this.loginObj).subscribe({
      next: (res: LoginResponse) => {
        // obtén el token, sea en res.token o en res.data.token
        const token = res.token ?? res.data?.token;
        if (!token) {
          console.error('No se recibió token');
          return;
        }

        // 1) guárdalo en localStorage
        localStorage.setItem('Token', token);
        console.log('Token guardado:', localStorage.getItem('Token'));

        // 2) opcional: cookie
        document.cookie = `Token=${token}; path=/; Secure; SameSite=Lax`;

        // 3) redirige a la página principal
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Login fallido', err);
      }
    });
  }
}
