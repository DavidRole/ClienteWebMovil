import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  // importa aquí solo los directorios standalone que necesita tu template
  imports: [ RouterOutlet, FormsModule ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'ClienteWebMovil';

  constructor(private http: HttpClient) {
  }
}