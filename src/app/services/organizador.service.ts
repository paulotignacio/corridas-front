import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Organizador } from '../models/organizador.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizadorService {
  private baseUrl = 'http://localhost:8000/organizadores'; // Sua URL da API

  constructor(private http: HttpClient) {}

  listarOrganizadores(): Observable<Organizador[]> {
    return this.http.get<Organizador[]>(this.baseUrl);
  }

  listarOrganizador(id: number): Observable<Organizador> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Organizador>(url);
  }
  
  atualizarOrganizador(organizador: Organizador): Observable<Organizador> {
    if(organizador.id == 0)
      return this.http.post<Organizador>(this.baseUrl+"/", organizador);
    else
      return this.http.put<Organizador>(this.baseUrl+"/"+organizador.id+"/", organizador)
  }

  removerOrganizador(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  login(username: string, password: string): Observable<Organizador[]> {
    const url = `${this.baseUrl}?username=${username}&password=${password}`;
    return this.http.get<Organizador[]>(url);
  }
}
