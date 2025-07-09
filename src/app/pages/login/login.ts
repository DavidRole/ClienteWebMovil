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

  constructor(private masterSrv: Master, private router: Router) {}

  onLogin() {
    this.masterSrv.login(this.loginObj).subscribe({
      next: (res: LoginResponse) => {
        const { token, expiration } = res;

        if (!token || !expiration) {
          console.error('Nothing was received');
          return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration);
        console.log('Token guardado:', localStorage.getItem('token'));
        console.log('Expiration guardada:', localStorage.getItem('expiration'));

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err);
        if (err.status === 401) {
          alert('Your user is no able to log in, please check with an administrator.');
        }
      },
    });
  }
}
