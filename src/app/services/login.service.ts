import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://corridasapi1-tnhfq4uw.b4a.run/dj-rest-auth'; // Sua URL da API

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Login> {
    const url = `${this.baseUrl}/login/`;
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    } 
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }
    const body = JSON.stringify({ username: username, password: password});
    return this.http.post<Login>(url, body, requestOptions);
  }
}
