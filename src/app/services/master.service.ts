// src/app/services/master.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginResponse {
  result: boolean;
  token?: string;
  data?: { token: string };
}

export interface RegisterResponse {
  result: boolean;
  token?: string;
  data?: { token: string };
}

@Injectable({
  providedIn: 'root'
})
export class Master {

  private baseUrl = 'https://davidsfelipe-001-site1.ltempurl.com/api';

  constructor(private http: HttpClient) { }

  getDishes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dish`);
  }

  login(loginObj: { username: string; password: string; }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginObj);
  }

  register(registerObj: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register`, registerObj);
  }
  
  placeOrder(orderPayload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/order`, orderPayload);
  }
}
