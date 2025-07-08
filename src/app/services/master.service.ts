import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Master {

  constructor(private http: HttpClient) { }

  getDishes() {
    return this.http.get<any[]>('http://localhost:5136/api/test/dishes');
  }

  login(loginObj: any) {
    return this.http.post('http://localhost:5136/api/auth/login', loginObj);
  }
}
