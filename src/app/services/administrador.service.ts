import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private baseUrl = 'https://corridasapi1-tnhfq4uw.b4a.run/administradores'; // Sua URL da API

  constructor(private http: HttpClient) {}

  listarAdministradores(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(this.baseUrl);
  }

  listarAdministrador(id: number): Observable<Administrador> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Administrador>(url);
  }
  
  atualizarAdministrador(administrador: Administrador): Observable<Administrador> {
    if(administrador.id == 0)
      return this.http.post<Administrador>(this.baseUrl+"/", administrador);
    else
      return this.http.put<Administrador>(this.baseUrl+"/"+administrador.id+"/", administrador)
  }

  removerAdministrador(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  login(username: string, password: string): Observable<Administrador[]> {
    const url = `${this.baseUrl}?username=${username}&password=${password}`;
    return this.http.get<Administrador[]>(url);
  }
}