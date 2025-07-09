import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Auth } from './services/auth'; // Importa el servicio de autenticación

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ RouterModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'ClienteWebMovil';

  constructor(private http: HttpClient, private auth: Auth) {
  }

  onProfileClick(evt: Event) {
    evt.preventDefault();
    
    this.auth.ensureLoggedIn();
  }
}