// src/app/services/master.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token:      string;
  expiration: string;  
}

export interface LoginResponse extends AuthResponse {}

export interface RegisterResponse extends AuthResponse {}

export interface UpdateResponse extends AuthResponse {}

export interface Profile {
  email:     string;
  firstName: string;
  lastName:  string;
  address:   string;
}

@Injectable({
  providedIn: 'root',
})
export class Master {
  private baseUrl = 'https://davidsfelipe-001-site1.ltempurl.com/api';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dish`);
  }

  login(loginObj: {
    username: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/auth/login`,
      loginObj
    );
  }

  register(registerObj: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/auth/register`,
      registerObj
    );
  }

  placeOrder(orderPayload: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Please log in to place an order.');
      return new Observable((observer) => {
        observer.error('No token found');
      });
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.baseUrl}/order`, orderPayload, {
      headers,
    });
  }

  updateProfile(updateObj: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Please log in to place an order.');
      return new Observable((observer) => {
        observer.error('No token found');
      });
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.baseUrl}/auth/update`, updateObj, {
      headers,
    });
  }

  changePassword(changePasswordObj: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Please log in to change your password.');
      return new Observable((observer) => {
        observer.error('No token found');
      });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(
      `${this.baseUrl}/auth/change-password`,
      changePasswordObj,
      { headers }
    );
  }

  getProfile(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Please log in to change your password.');
      return new Observable((observer) => {
        observer.error('No token found');
      });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Profile>(`${this.baseUrl}/auth/profile`, { headers });
  }
}
