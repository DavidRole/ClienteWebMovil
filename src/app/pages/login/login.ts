
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginObj: any = {
      "username": "",
      "password": ""
  }


  constructor(private masterSrv: Master) {}

  onLogin() {
    this.masterSrv.login(this.loginObj).subscribe((res:any)=>{
      if(res.result){
        localStorage.setItem('Token', JSON.stringify(res.data.token));
      }
    })
  }
}
