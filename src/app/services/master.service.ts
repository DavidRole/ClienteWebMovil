import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Master {

  constructor(private http: HttpClient) { }

  getDishes() {
    return this.http.get<any[]>('https://davidsfelipe-001-site1.ltempurl.com/api/test/dishes');
  }

  login(loginObj: any) {
    return this.http.post('https://davidsfelipe-001-site1.ltempurl.com/api/auth/login', loginObj);
  }
  register(registerObj: any) {
    return this.http.post('https://davidsfelipe-001-site1.ltempurl.com/api/auth/register', registerObj);
  }
  
  placeOrder(orderPayload: any) {
    return this.http.post('https://davidsfelipe-001-site1.ltempurl.com/api/order', orderPayload);
  }
}
