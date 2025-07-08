import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginObj: any = {
    username: '',
    password: '',
  };

  constructor(private masterSrv: Master) {}

  onLogin() {
    this.masterSrv.login(this.loginObj).subscribe({
      next: (res) => {
        // pick the right spot
        const token = res.token ?? res.data?.token;
        if (token) {
          // 1) localStorage
          localStorage.setItem('Token', token);
          console.log(
            '✅ Stored localStorage Token:',
            localStorage.getItem('Token')
          );

          // 2) optionally also set a cookie
          document.cookie = `Token=${token}; path=/; Secure; SameSite=Lax`;
        } else {
          console.error('❌ No token found in response');
        }
      },
      error: (err) => console.error('Login failed', err),
    });
  }
}
