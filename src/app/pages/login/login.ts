
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginObj: any = {
      "email": "",
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
