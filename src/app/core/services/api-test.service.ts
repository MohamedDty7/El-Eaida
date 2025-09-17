import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequestDto } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiTestService {
  private readonly API_URL = 'https://localhost:7246/api';

  constructor(private http: HttpClient) {}

  // اختبار الاتصال بالخادم
  testConnection(): Observable<any> {
    console.log('Testing connection to:', this.API_URL);
    return this.http.get(`${this.API_URL}/test`, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  // اختبار endpoint التسجيل
  testRegisterEndpoint(): Observable<any> {
    const testData: RegisterRequestDto = {
      Username: 'testuser',
      Email: 'test@example.com',
      Password: 'TestPass123', // Added uppercase letter
      Phone: '1234567890',
      Role: ['patient']
    };

    console.log('Testing register endpoint with data:', testData);
    return this.http.post(`${this.API_URL}/Auth/register`, testData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });
  }

  // اختبار CORS
  testCors(): Observable<any> {
    return this.http.options(`${this.API_URL}/Auth/register`, {
      headers: new HttpHeaders({
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      })
    });
  }
}
