import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Master } from '../../services/master.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register{
  registerObj: any = {
    firstName: '',
    lastName:  '',
    email:     '',
    address:   '',
    password:  ''
  };

  constructor(
    private masterSrv: Master,
    private router: Router
  ) {}

  onRegister() {
    this.masterSrv.register(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        localStorage.setItem('Token', JSON.stringify(res.data.token));
        this.router.navigate(['/login']);
      } else {
        console.error('Error at registration:', res);
      }
    }, err => {
      console.error('Error at registration:', err);
    });
  }
}
