import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private baseUrl = 'https://corridasapi-8xt2jifx.b4a.run/estados'; // Sua URL da API

  constructor(private http: HttpClient) {}

  listarEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.baseUrl);
  }

  listarEstado(id: number): Observable<Estado> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Estado>(url);
  }
  
  atualizarEstado(estado: Estado): Observable<Estado> {
    if(estado.id == 0)
      return this.http.post<Estado>(this.baseUrl+"/", estado);
    else
      return this.http.put<Estado>(this.baseUrl+"/"+estado.id+"/", estado)
  }

  removerEstado(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}