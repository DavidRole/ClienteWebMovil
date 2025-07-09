import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Master, RegisterResponse } from '../../services/master.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register{
  registerObj: any = {
    email:     '',
    password:  '',
    firstName: '',
    lastName:  '',
    address:   ''
  };

  constructor(
    private masterSrv: Master,
    private router: Router
  ) {}

  onRegister() {
    this.masterSrv.login(this.registerObj).subscribe({
          next: (res: RegisterResponse) => {
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
            console.error('Register failed', err);
          }
        });
  }
}
